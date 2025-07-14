import { TestBed } from '@angular/core/testing';

import { ChatAiServicService } from './chat-ai.servic.service';

describe('ChatAiServicService', () => {
  let service: ChatAiServicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAiServicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
