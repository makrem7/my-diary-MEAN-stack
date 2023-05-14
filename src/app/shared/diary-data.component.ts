import { Injectable } from "@angular/core";
import { DiaryEntry } from "./diary-entry.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({  providedIn:"root" })
export class DiaryDataService{
    public maxId:number;
    constructor(private http:HttpClient){}
    
    diarySubject= new Subject<DiaryEntry[]>();

    diaryEntries: DiaryEntry[]=[
        new DiaryEntry(1,"Jan 1st","Entry 1"),
        new DiaryEntry(2,"Jan 2nd", "hello world")
    ]


    getDiaryEntries(){
        this.http.get<{diaryEntries:DiaryEntry[]}>("http://localhost:3000/diary-entries").subscribe(jsonData=>{
            this.diaryEntries = jsonData.diaryEntries;
            this.diarySubject.next(this.diaryEntries);
        })
    }


    onDelete(index: number): void {
        this.diaryEntries.splice(index,1);
        this.diarySubject.next(this.diaryEntries);
    }
    onAdd(newEntry: DiaryEntry){
        this.http.get<{maxId:number}>("http://localhost:3000/max-id").subscribe((jsonData=>{
            newEntry.id = jsonData.maxId+1
            this.http.post<{message:string}>("http://localhost:3000/add-entry",newEntry).subscribe((jsonData)=>{
                this.getDiaryEntries();
            })
        }))
    }
    onUpdate(paramId: number, newEntry: DiaryEntry) {
        this.diaryEntries[paramId]=newEntry;
        this.diarySubject.next(this.diaryEntries);
      }
    getDiaryEntry(index :number):DiaryEntry{

        return {...this.diaryEntries[index]}
    }

}