import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';
import * as moment from 'moment';
import { AverageService } from 'src/app/services/average.service';
import {
  AverageOfMonth,
  AverageOfYear,
  AverageOfWeek,
} from 'src/app/interfaces/average';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnDestroy {
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
  typeOfGraph = 'day';
  weightGraph = true;
  fatGraph = false;
  totalCalGraph = false;

  view = [];
  legend = false;
  legendPosition = 'below';
  legendWeight = '体重';
  legendFat = '体脂肪';
  legendTotalCal = '摂取カロリー';
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
    domain: ['#009688', '#FB8C00'],
  };
  constructor(
    private mainShellService: MainShellService,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private basicInfoService: BasicInfoService,
    private averageService: AverageService
  ) {
    this.mainShellService.setTitle('グラフ');
    this.view = [innerWidth / 1, innerWidth / 1];
    if (innerWidth > 750) {
      this.view = [innerWidth / 3.5, innerWidth / 3.5];
      this.fatGraph = true;
      this.totalCalGraph = true;
      this.legend = true;
    }
    this.basicInfoService
      .getBasicInfo(this.authService.uid)
      .subscribe((info) => (this.basicInfo = info));
    this.createGraphOfDay(this.today);
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

  createGraphOfDay(initialDate: Date, event?: MatDatepickerInputEvent<Date>) {
    this.typeOfGraph = 'day';
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
                name: 'カロリー (kcal)',
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
  createGraphOfWeek(initialDate: Date, event?: MatDatepickerInputEvent<Date>) {
    this.typeOfGraph = 'week';
    let date = initialDate;
    this.preWeight = [];
    this.preFat = [];
    this.preTotalCal = [];
    this.goalWeightList = [];
    this.goalFatList = [];
    this.goalTotalCalList = [];
    if (event) {
      date = event.value;
    }
    this.averageService
      .getAveragesOfWeek(
        this.authService.uid,
        this.datePipe.transform(date, 'yy.MM.dd(E)')
      )
      .subscribe(
        (datasOfWeeks: [AverageOfWeek[], AverageOfWeek[], AverageOfWeek[]]) => {
          if (datasOfWeeks !== undefined) {
            datasOfWeeks.forEach((dataOfWeeks: AverageOfWeek[], i) => {
              console.log(dataOfWeeks.length, 'dataOfWeeks');

              dataOfWeeks.forEach((dataOfWeek: AverageOfWeek, j) => {
                if (dataOfWeek !== undefined) {
                  switch (dataOfWeek.category) {
                    case 'weight':
                      console.log(dataOfWeek, i);

                      this.preWeight.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: dataOfWeek.averageOfWeek,
                      });
                      this.goalWeightList.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: this.basicInfo.goalWeight
                          ? this.basicInfo.goalWeight
                          : 0,
                      });
                      break;
                    case 'fat':
                      this.preFat.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: dataOfWeek.averageOfWeek,
                      });
                      this.goalFatList.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: this.basicInfo.goalFat
                          ? this.basicInfo.goalFat
                          : 0,
                      });
                      break;
                    case 'cal':
                      console.log(dataOfWeek, i, j);
                      this.preTotalCal.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: dataOfWeek.averageOfWeek,
                      });
                      this.goalTotalCalList.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: this.basicInfo.goalCal
                          ? this.basicInfo.goalCal
                          : 0,
                      });
                      break;
                  }
                }
                console.log(i, j);

                if (
                  i === datasOfWeeks.length - 1 &&
                  j === dataOfWeeks.length - 1
                ) {
                  console.log(this.preWeight);

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
                      name: 'カロリー (kcal)',
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
        }
      );
  }
  createGraphOfMonth(initialDate: Date, event?: MatDatepickerInputEvent<Date>) {
    this.typeOfGraph = 'month';
    let date = initialDate;
    this.preWeight = [];
    this.preFat = [];
    this.preTotalCal = [];
    this.goalWeightList = [];
    this.goalFatList = [];
    this.goalTotalCalList = [];
    if (event) {
      date = event.value;
    }
    this.averageService
      .getAveragesOfMonth(
        this.authService.uid,
        this.datePipe.transform(date, 'yy.MM.dd(E)')
      )
      .subscribe(
        (
          datasOfMonthList: [
            AverageOfMonth[],
            AverageOfMonth[],
            AverageOfMonth[]
          ]
        ) => {
          if (datasOfMonthList !== undefined) {
            console.log(datasOfMonthList);

            datasOfMonthList.forEach((dataOfMonthList: AverageOfMonth[], i) => {
              dataOfMonthList.forEach((dataOfMonth: AverageOfMonth, j) => {
                if (dataOfMonth !== undefined) {
                  switch (dataOfMonth.category) {
                    case 'weight':
                      console.log(dataOfMonth, i);
                      this.preWeight.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: dataOfMonth.averageOfMonth,
                      });
                      this.goalWeightList.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: this.basicInfo.goalWeight
                          ? this.basicInfo.goalWeight
                          : 0,
                      });
                      break;
                    case 'fat':
                      this.preFat.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: dataOfMonth.averageOfMonth,
                      });
                      this.goalFatList.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: this.basicInfo.goalFat
                          ? this.basicInfo.goalFat
                          : 0,
                      });
                      break;
                    case 'cal':
                      console.log(dataOfMonth, i, j);
                      this.preTotalCal.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: dataOfMonth.averageOfMonth,
                      });
                      this.goalTotalCalList.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: this.basicInfo.goalCal
                          ? this.basicInfo.goalCal
                          : 0,
                      });
                      break;
                  }
                }
                console.log(i, j);

                if (
                  i === datasOfMonthList.length - 1 &&
                  j === dataOfMonthList.length - 1
                ) {
                  console.log(this.preWeight);

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
                      name: 'カロリー (kcal)',
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
        }
      );
  }
  createGraphOfYear(initialDate: Date, event?: MatDatepickerInputEvent<Date>) {
    this.typeOfGraph = 'year';
    let date = initialDate;
    this.preWeight = [];
    this.preFat = [];
    this.preTotalCal = [];
    this.goalWeightList = [];
    this.goalFatList = [];
    this.goalTotalCalList = [];
    if (event) {
      date = event.value;
    }
    this.averageService
      .getAveragesOfYear(
        this.authService.uid,
        this.datePipe.transform(date, 'yy.MM.dd(E)')
      )
      .subscribe(
        (
          datasOfYearList: [AverageOfYear[], AverageOfYear[], AverageOfYear[]]
        ) => {
          if (datasOfYearList !== undefined) {
            console.log(datasOfYearList);

            datasOfYearList.forEach((dataOfYearList: AverageOfYear[], i) => {
              dataOfYearList.forEach((dataOfYear: AverageOfYear, j) => {
                if (dataOfYear !== undefined) {
                  switch (dataOfYear.category) {
                    case 'weight':
                      console.log(dataOfYear, i);
                      this.preWeight.unshift({
                        name: `${dataOfYear.year}年`,
                        value: dataOfYear.averageOfYear,
                      });
                      this.goalWeightList.unshift({
                        name: `${dataOfYear.year}年`,
                        value: this.basicInfo.goalWeight
                          ? this.basicInfo.goalWeight
                          : 0,
                      });
                      break;
                    case 'fat':
                      this.preFat.unshift({
                        name: `${dataOfYear.year}年`,
                        value: dataOfYear.averageOfYear,
                      });
                      this.goalFatList.unshift({
                        name: `${dataOfYear.year}年`,
                        value: this.basicInfo.goalFat
                          ? this.basicInfo.goalFat
                          : 0,
                      });
                      break;
                    case 'cal':
                      console.log(dataOfYear, i, j);
                      this.preTotalCal.unshift({
                        name: `${dataOfYear.year}年`,
                        value: dataOfYear.averageOfYear,
                      });
                      this.goalTotalCalList.unshift({
                        name: `${dataOfYear.year}年`,
                        value: this.basicInfo.goalCal
                          ? this.basicInfo.goalCal
                          : 0,
                      });
                      break;
                  }
                }
                console.log(i, j);

                if (
                  i === datasOfYearList.length - 1 &&
                  j === dataOfYearList.length - 1
                ) {
                  console.log(this.preWeight);

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
                      name: 'カロリー (kcal)',
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
        }
      );
  }
  createGraphByChangingDate(event: MatDatepickerInputEvent<Date>) {
    switch (this.typeOfGraph) {
      case 'day':
        this.createGraphOfDay(this.today, event);
        break;
      case 'week':
        this.createGraphOfWeek(this.today, event);
        break;
      case 'month':
        this.createGraphOfMonth(this.today, event);
        break;
      case 'year':
        this.createGraphOfYear(this.today, event);
        break;
    }
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
