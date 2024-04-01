import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IDigimonListResponse } from 'src/core/interfaces/digimon-list-response.interface';
import { IDigimon } from 'src/core/interfaces/digimon.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DigimonService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves a list of Digimons based on the provided query parameters.
   * @param queryParams - The query parameters for pagination (page number and page size).
   * @returns An Observable that emits the list of Digimons.
   */
  getDigimons(queryParams: { page: number; pageSize: number }) {
    return this.httpClient
      .get<IDigimonListResponse>(`${environment.digimonUrl}/digimon`, {
        params: queryParams,
      })
      .pipe(
        map((response) => {
          return response.content;
        }),
      );
  }
  /**
   * Retrieves a Digimon by its ID.
   * @param id - The ID of the Digimon to retrieve.
   * @returns A Promise that resolves to the Digimon object.
   */
  getDigimonById(id: string) {
    return this.httpClient.get<IDigimon>(
      `${environment.digimonUrl}/digimon/${id}`,
    );
  }
}
