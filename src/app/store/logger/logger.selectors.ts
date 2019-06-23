import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoggerState } from './logger.state';

const visitCounter = createFeatureSelector<LoggerState>('logger');

export const infoMessage = createSelector(
  visitCounter,
  logger => logger.infoMessages
);