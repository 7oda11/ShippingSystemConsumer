import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WOW } from 'wowjs';

declare var $: any; // Declare jQuery for TypeScript

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @Input() isLeftSidebarCollapsed!: boolean;
  @Input() screenWidth!: number;

  ngOnInit(): void {
    // Component initialization logic can go here
  }

  ngAfterViewInit(): void {
    // Initialize WOW.js after view is initialized
    new WOW().init();

    // Initialize carousels and other JavaScript features
    setTimeout(() => {
      console.log('Initializing carousels...');

      // Initialize header carousel
      if ($('.header-carousel').length > 0) {
        console.log('Header carousel found, initializing...');
        $('.header-carousel').owlCarousel({
          autoplay: false,
          smartSpeed: 1500,
          items: 1,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>',
          ],
        });
        console.log('Header carousel initialized');
      } else {
        console.log('Header carousel not found');
      }

      // Initialize testimonial carousel
      if ($('.testimonial-carousel').length > 0) {
        console.log('Testimonial carousel found, initializing...');
        $('.testimonial-carousel').owlCarousel({
          autoplay: false,
          smartSpeed: 1000,
          center: true,
          dots: true,
          loop: true,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
          },
        });
        console.log('Testimonial carousel initialized');
      } else {
        console.log('Testimonial carousel not found');
      }

      // Initialize counter-up
      if ($('[data-toggle="counter-up"]').length > 0) {
        console.log('Counter elements found, initializing...');
        $('[data-toggle="counter-up"]').counterUp({
          delay: 10,
          time: 2000,
        });
        console.log('Counter elements initialized');
      } else {
        console.log('Counter elements not found');
      }
    }, 500); // Increased timeout to 500ms
  }
}
