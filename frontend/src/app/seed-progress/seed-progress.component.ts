import { Component, OnInit } from '@angular/core';
import { Seed } from 'src/models/seed';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seed-progress',
  templateUrl: './seed-progress.component.html',
  styleUrls: ['./seed-progress.component.css']
})
export class SeedProgressComponent implements OnInit {

  seed: Seed;
  name: string;
  producer: string;
  progress: number;
  valueNow: number;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.seed  = JSON.parse(this.router.parseUrl(this.router.url).queryParams['user']);
    this.valueNow = Number((this.seed.progress.valueOf() / this.seed.totalGrowDays.valueOf() * 100).toFixed(2));
    console.log(this.valueNow);
    this.addDetails();
  }

  addDetails(){
    let div = document.createElement("div");
    div.id = "details";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.position = "fixed";
    div.style.fontSize = "15px";
    div.style.border = ".5px solid black";
    div.style.width = "350px";
    div.style.height = "130px"
    div.style.fontSize = "20px";
    div.style.margin = "15px"
    div.style.backgroundColor = "white";
    div.setAttribute("z-index", 100 + "");

    let name = document.createElement("div");
    name.id = "subDetail";
    name.style.margin = "5px";
    name.innerHTML = "Name: " + this.seed.name;
    name.setAttribute("z-index", 100 + "");
    div.append(name);

    let producer = document.createElement("div");
    producer.innerHTML = "Producer: " + this.seed.producer;
    producer.style.margin = "5px";
    div.append(producer);

    let valueNow = Number((this.seed.progress.valueOf() / this.seed.totalGrowDays.valueOf() * 100).toFixed(2));
    let progress = document.createElement("div");
    progress.className = "progress";
    progress.style.margin = "10px";
    let progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuenow", valueNow + "");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
    progressBar.style.width = valueNow + "%";
    progressBar.innerHTML = valueNow + "%";
    progress.append(progressBar);
    div.append(progress);

    let btn = document.createElement("button");
    btn.style.margin = "5px";
    btn.className = "btn btn-large btn-warning";
    btn.innerHTML = "Add elixir";
    btn.style.fontSize = "16px";
    // btn.onclick = this.addElixir(seed, event);
    div.append(btn);
    document.documentElement.append(div);
  }

  //todo: implement
  addElixir(){

  }
}
