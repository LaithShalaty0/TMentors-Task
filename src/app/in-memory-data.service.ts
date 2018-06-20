import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const products = [
      {
        id: 1,
        title: 'Front-End',
        projectName: 'Task',
        memberName: 'Employer',
        createDate: '20-06-2018',
        startDate: '20-06-2018',
        endDate: '20-06-2018'
      },
      {
        id: 2,
        title: 'Front-End',
        projectName: 'Task',
        memberName: 'Employer',
        createDate: '20-06-2018',
        startDate: '20-06-2018',
        endDate: '20-06-2018'
      }
    ];

    return { products };
  }

  constructor() { }
}
