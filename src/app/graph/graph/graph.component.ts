import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';
import * as moment from 'moment';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  events: string[] = [];
  today = new Date();
  dates: string[] = this.getDates(new Date());
  basicInfo: BasicInfo;
  dataWeight: any[] = [];
  dataFat: any[] = [];
  dataTotalCal: any[] = [];
  preData = [];
  preWeight = [];
  preFat = [];
  preTotalCal = [];
  goalWeightList = [];
  goalFatList = [];
  goalTotalCalList = [];
  graphTitle = '体重';
  weightGraph = true;
  fatGraph = false;
  totalCalGraph = false;
  // options
  view = [];
  legend = false;
  legendPosition = 'below';
  legendTitle = '';
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = false;
  showXAxisLabel = false;
  xAxisLabel = '年';
  yAxisLabel = '体脂肪（%）';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#000000'],
  };
  constructor(
    private mainShellService: MainShellService,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private basicInfoService: BasicInfoService
  ) {
    this.mainShellService.setTitle('グラフ');
    if (innerWidth < 500) {
      this.view = [innerWidth / 1, innerWidth / 1];
    }
    this.basicInfoService
      .getBasicInfo(this.authService.uid)
      .subscribe((info) => (this.basicInfo = info));
    this.createGraphByChangingDate(this.today);
  }
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.view = [event.target.innerWidth / 1, event.target.innerWidth / 1];
    }
  }

  getDates(date) {
    const preDates = [];
    for (let i = 0; i <= 6; i++) {
      const mDate = moment(date);
      const a = mDate.add(-i, 'day');
      preDates.push(this.datePipe.transform(a, 'yy.MM.dd(E)'));
    }
    if (preDates.length === 7) {
      return preDates;
    }
  }
  createGraphByChangingDate(
    initialDate: Date,
    event?: MatDatepickerInputEvent<Date>
  ) {
    this.dates = [];
    this.preWeight = [];
    this.preFat = [];
    this.preTotalCal = [];
    this.goalWeightList = [];
    this.goalFatList = [];
    this.goalTotalCalList = [];

    if (event) {
      this.dates = this.getDates(event.value);
    } else {
      this.dates = this.getDates(initialDate);
    }

    this.dailyInfoService
      .getDailyInfosEveryWeek(this.authService.uid, this.dates)
      .forEach((dailyInfo$, index) => {
        dailyInfo$.subscribe((dailyInfo) => {
          if (dailyInfo !== undefined) {
            this.preWeight.unshift({
              name: this.dates[index],
              value: dailyInfo.currentWeight ? dailyInfo.currentWeight : 0,
            });
            this.preFat.unshift({
              name: this.dates[index],
              value: dailyInfo.currentFat ? dailyInfo.currentFat : 0,
            });
            this.preTotalCal.unshift({
              name: this.dates[index],
              value: dailyInfo.totalCal ? dailyInfo.totalCal : 0,
            });
            this.goalWeightList.unshift({
              name: this.dates[index],
              value: this.basicInfo.goalWeight ? this.basicInfo.goalWeight : 0,
            });
            this.goalFatList.unshift({
              name: this.dates[index],
              value: this.basicInfo.goalFat ? this.basicInfo.goalFat : 0,
            });
            this.goalTotalCalList.unshift({
              name: this.dates[index],
              value: this.basicInfo.goalCal ? this.basicInfo.goalCal : 0,
            });
          } else {
            this.preWeight.unshift({
              name: this.dates[index],
              value: 0,
            });
            this.preFat.unshift({
              name: this.dates[index],
              value: 0,
            });
            this.preTotalCal.unshift({
              name: this.dates[index],
              value: 0,
            });
            this.goalWeightList.unshift({
              name: this.dates[index],
              value: this.basicInfo.goalWeight ? this.basicInfo.goalWeight : 0,
            });
            this.goalFatList.unshift({
              name: this.dates[index],
              value: this.basicInfo.goalFat ? this.basicInfo.goalFat : 0,
            });
            this.goalTotalCalList.unshift({
              name: this.dates[index],
              value: this.basicInfo.goalCal ? this.basicInfo.goalCal : 0,
            });
          }

          if (index === 6) {
            this.dataWeight = [
              {
                name: '体重 (kg)',
                series: [...this.preWeight],
              },
              {
                name: '目標体重 (kg)',
                series: [...this.goalWeightList],
              },
            ];
            this.dataFat = [
              {
                name: '体脂肪 (%)',
                series: [...this.preFat],
              },
              {
                name: '目標体脂肪 (%)',
                series: [...this.goalFatList],
              },
            ];
            this.dataTotalCal = [
              {
                name: 'カロリー (kg)',
                series: [...this.preTotalCal],
              },
              {
                name: '目標カロリー (kcal)',
                series: [...this.goalTotalCalList],
              },
            ];
          }
        });
      });
  }
  changeTitle(category: string) {
    switch (category) {
      case 'weight':
        this.graphTitle = '体重';
        this.weightGraph = true;
        this.fatGraph = false;
        this.totalCalGraph = false;
        break;
      case 'fat':
        this.graphTitle = '体脂肪';
        this.weightGraph = false;
        this.fatGraph = true;
        this.totalCalGraph = false;
        break;
      case 'totalCal':
        this.graphTitle = 'カロリー';
        this.weightGraph = false;
        this.fatGraph = false;
        this.totalCalGraph = true;
        break;
    }
  }
  ngOnInit(): void {}
}
