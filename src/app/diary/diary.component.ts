import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { Subject, Subscription } from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit , OnDestroy{

  diaryEntries:DiaryEntry[];
  diarySubscription = new Subscription();
  constructor(private diaryDataService : DiaryDataService, private router: Router ){}
  ngOnInit(): void {
    this.diaryDataService.getDiaryEntries();
    this.diarySubscription= this.diaryDataService.diarySubject.subscribe(
      diaryEntries=> {this.diaryEntries=diaryEntries}
    );
  }
  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  onDelete(index: number): void {
    this.diaryDataService.onDelete(index)
  }
  onEdit(index: number): void {
    this.router.navigate(["edit", index])
  }
  

}
