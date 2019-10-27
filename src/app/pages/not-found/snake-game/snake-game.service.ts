import { Injectable } from '@angular/core';

@Injectable()
export class SnakeGameService {

  private ngxSnake = 'ngx_snake';

  store(score: number) {
    localStorage.setItem(this.ngxSnake, JSON.stringify({ best_score: score }));
  }

  retrieve() {
    let storage = this.parse();
    if (!storage) {
      this.store(0);
      storage = this.parse();
    }

    return storage.best_score;
  }

  private parse() {
    return JSON.parse(localStorage.getItem(this.ngxSnake));
  }
}
