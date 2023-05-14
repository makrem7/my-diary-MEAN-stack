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


    onUpdate(id: number, newEntry: DiaryEntry) {
        this.http.put<{message:string}>("http://localhost:3000/update-entry/"+id,newEntry).subscribe(jsonData=>{
            this.getDiaryEntries();
        })
      }

    onDelete(id: number): void {
        this.http.delete<{message:string}>("http://localhost:3000/remove-entry/"+id).subscribe(jsonData=>{
            this.getDiaryEntries();
        })
    }
    onAdd(newEntry: DiaryEntry){
        this.http.get<{maxId:number}>("http://localhost:3000/max-id").subscribe((jsonData=>{
            newEntry.id = jsonData.maxId+1
            this.http.post<{message:string}>("http://localhost:3000/add-entry",newEntry).subscribe((jsonData)=>{
                this.getDiaryEntries();
            })
        }))
    }
    getDiaryEntry(id :number):DiaryEntry{
        const index = this.diaryEntries.findIndex(el => {
            return el.id == id;
        })

        return this.diaryEntries[index]
    }

}