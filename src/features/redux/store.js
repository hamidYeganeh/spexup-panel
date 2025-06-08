import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
// services
import { BlogApi } from 'src/services/blog-api';
import { CategoryApi } from 'src/services/category-api';
import { BlogCommentApi } from 'src/services/blogComment-api';
import { ContactApi } from 'src/services/contact-api';
import { AuthApi } from 'src/services/auth-api';
import { DutyApi } from 'src/services/duty-api';
import { ProjectApi } from 'src/services/project-api';
import { globalErrorHandler } from 'src/utils/errorHandler';
import { UserApi } from 'src/services/user-api';

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    globalErrorHandler(action.payload);
  }
  return next(action);
};

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [BlogApi.reducerPath]: BlogApi.reducer,
  [BlogCommentApi.reducerPath]: BlogCommentApi.reducer,
  [CategoryApi.reducerPath]: CategoryApi.reducer,
  [ContactApi.reducerPath]: ContactApi.reducer,
  [DutyApi.reducerPath]: DutyApi.reducer,
  [ProjectApi.reducerPath]: ProjectApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(BlogApi.middleware)
      .concat(BlogCommentApi.middleware)
      .concat(CategoryApi.middleware)
      .concat(ContactApi.middleware)
      .concat(DutyApi.middleware)
      .concat(UserApi.middleware)
      .concat(ProjectApi.middleware),
});
