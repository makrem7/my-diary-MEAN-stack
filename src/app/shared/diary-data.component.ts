import { Injectable } from "@angular/core";
import { DiaryEntry } from "./diary-entry.model";
import { Subject } from "rxjs";
@Injectable({  providedIn:"root" })
export class DiaryDataService{
    
    diarySubject= new Subject<DiaryEntry[]>();

    diaryEntries: DiaryEntry[]=[
        new DiaryEntry(1,"Jan 1st","Entry 1"),
        new DiaryEntry(2,"Jan 2nd", "hello world")
    ]

    onDelete(index: number): void {
        this.diaryEntries.splice(index,1);
        this.diarySubject.next(this.diaryEntries);
    }
    onAdd(newEntry: DiaryEntry){
        this.diaryEntries.push(newEntry);
        this.diarySubject.next(this.diaryEntries);
    }
    onUpdate(paramId: number, newEntry: DiaryEntry) {
        this.diaryEntries[paramId]=newEntry;
        this.diarySubject.next(this.diaryEntries);
      }
    getDiaryEntry(index :number):DiaryEntry{

        return {...this.diaryEntries[index]}
    }

}