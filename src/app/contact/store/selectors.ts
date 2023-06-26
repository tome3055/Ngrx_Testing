import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactPagePresentationModel } from "../interfaces/contactpage.model.interface";

export const submitFeatureSelector = createFeatureSelector<ContactPagePresentationModel>("contactpage");

export const modelSelector = createSelector(submitFeatureSelector, (model: ContactPagePresentationModel) => model);


export const submitFeatureSelectorMock = (state: ContactPagePresentationModel) => state;//createFeatureSelector<ContactPagePresentationModel>("submit");

export const mockModelSelector = createSelector(submitFeatureSelectorMock, (model: ContactPagePresentationModel) => model);