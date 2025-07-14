import { TestBed } from '@angular/core/testing';

import { HuggingfaceAiService } from './huggingface-ai.service';

describe('HuggingfaceAiService', () => {
  let service: HuggingfaceAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuggingfaceAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
