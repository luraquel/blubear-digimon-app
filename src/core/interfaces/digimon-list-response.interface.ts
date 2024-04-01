import { IDigimonPartial } from './digimon-partial.interface';

export interface IDigimonListResponse {
  content: IDigimonPartial[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  };
}
