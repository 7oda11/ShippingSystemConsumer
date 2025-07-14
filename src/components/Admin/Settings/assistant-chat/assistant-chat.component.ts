import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../services/admin/branch.service';
import { Branch } from '../../../../models/Branch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant-chat',
  templateUrl: './assistant-chat.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./assistant-chat.component.css'],
})
export class AssistantChatComponent implements OnInit {
  branches: Branch[] = [];
  messages: { text: string; isUser: boolean; time: string }[] = [];
  question = '';
  isLoading = false;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.gitBranches().subscribe({
      next: (res) => {
        this.branches = res;
      },
      error: (err) => {
        console.error('Failed to load branches:', err);
      },
    });
  }

  sendMessage() {
    if (!this.question.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.messages.push({
      text: this.question,
      isUser: true,
      time: currentTime,
    });
    this.isLoading = true;

    setTimeout(() => {
      this.answerQuestion(this.question);
      this.isLoading = false;
      this.question = '';
    }, 500);
  }

  answerQuestion(userQuestion: string) {
    const q = userQuestion.toLowerCase();
    let answer = '';

    if (q.includes('hello')) {
      answer = 'How can I help you?';
    } else if (q.includes('how many') && q.includes('branch')) {
      answer = `We currently have ${this.branches.length} branches.`;
    } else if (q.includes('name') && q.includes('first')) {
      answer =
        this.branches.length > 0
          ? `The first branch is: ${this.branches[0].name}`
          : 'No branches available.';
    } else if (q.includes('name') && q.includes('last')) {
      answer =
        this.branches.length > 0
          ? `The last branch is: ${
              this.branches[this.branches.length - 1].name
            }`
          : 'No branches available.';
    } else if (q.includes('list') || q.includes('all branches')) {
      answer =
        this.branches.length > 0
          ? 'Available branches:\n' +
            this.branches.map((b, i) => `${i + 1}. ${b.name}`).join('\n')
          : 'No branches available.';
    } else if (q.includes('starts with')) {
      const letter = q.split('starts with ')[1]?.charAt(0);
      if (letter) {
        const filtered = this.branches.filter((b) =>
          b.name.toLowerCase().startsWith(letter)
        );
        answer =
          filtered.length > 0
            ? `Branches starting with '${letter}':\n` +
              filtered.map((b) => b.name).join('\n')
            : `No branches start with '${letter}'.`;
      } else {
        answer = 'Please specify a letter.';
      }
    } else if (q.includes('exists branch') || q.includes('is there branch')) {
      const nameToCheck = q.split('branch ')[1]?.trim();
      const found = this.branches.find(
        (b) => b.name.toLowerCase() === nameToCheck
      );
      answer = found
        ? `Yes, branch "${found.name}" exists.`
        : `No branch named "${nameToCheck}" found.`;
    } else if (q.includes('branch with id')) {
      const idMatch = q.match(/branch with id (\d+)/);
      if (idMatch) {
        const id = +idMatch[1];
        const found = this.branches.find((b) => Number(b.id) === id);
        answer = found
          ? `Branch with ID ${id} is "${found.name}".`
          : `No branch found with ID ${id}.`;
      } else {
        answer = 'Please provide a valid branch ID.';
      }
    } else {
      answer = 'Sorry, I did not understand your question.';
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.messages.push({ text: answer, isUser: false, time: currentTime });

    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }
}
