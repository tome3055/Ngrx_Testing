import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { increment, incrementSuccess } from './actions';
import { CounterEffects } from './effects';

describe('Counter Reducers', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: { count: 0 } }),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  it('should increment the count', () => {
    store.dispatch(increment());
    store.select((state: { count: any; }) => state.count).subscribe(count => {
      expect(count).toBe(1);
    });
  });
});