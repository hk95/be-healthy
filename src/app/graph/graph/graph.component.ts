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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnDestroy {
  private readonly userId = this.authService.uid;
  private subscription = new Subscription();
  private dates: string[] = this.getDates(new Date());
  private goalWeight = 0;
  private goalFat = 0;
  private goalCal = 0;
  private goalWeightList = new Array();
  private goalFatList = new Array();
  private goalTotalCalList = new Array();

  today = new Date();
  preWeight = new Array();
  preFat = new Array();
  preTotalCal = new Array();
  dataWeight: any[] = new Array();
  dataFat: any[] = new Array();
  dataTotalCal: any[] = new Array();
  graphTitle = '体重';
  typeOfGraph = 'day';
  weightGraph = true;
  fatGraph = false;
  totalCalGraph = false;
  loading: boolean;
  maxDate = new Date();
  minDate = new Date(2018, 0, 1);

  view = new Array();
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
    this.loading = true;
    this.mainShellService.setTitle('グラフ');
    this.initResize();
    this.setGoalList();
    this.createGraphOfDay(this.today);
  }

  initResize() {
    this.view = [innerWidth / 1.1, innerWidth / 1.1];
    if (innerWidth > 750) {
      this.view = [300, 300];
      this.fatGraph = true;
      this.totalCalGraph = true;
      this.legend = true;
    }
  }

  setGoalList() {
    this.subscription = this.basicInfoService
      .getBasicInfo(this.userId)
      .subscribe((basicInfo: BasicInfo) => {
        if (basicInfo !== undefined) {
          this.goalWeight = basicInfo.goalWeight ? basicInfo.goalWeight : 0;
          this.goalFat = basicInfo.goalFat ? basicInfo.goalFat : 0;
          this.goalCal = basicInfo.goalCal ? basicInfo.goalCal : 0;
        }
      });
  }

  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.view = [event.target.innerWidth / 1, event.target.innerWidth / 1];
    }
  }

  getDates(date) {
    const preDates = new Array();
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
    this.loading = true;
    this.typeOfGraph = 'day';
    this.dates = new Array();
    this.preWeight = new Array();
    this.preFat = new Array();
    this.preTotalCal = new Array();
    this.goalWeightList = new Array();
    this.goalFatList = new Array();
    this.goalTotalCalList = new Array();

    if (event) {
      this.dates = this.getDates(event.value);
    } else {
      this.dates = this.getDates(initialDate);
    }

    this.dailyInfoService
      .getDailyInfosEveryWeek(this.userId, this.dates)
      .forEach((dailyInfo$, index) => {
        this.subscription = dailyInfo$.subscribe((dailyInfo) => {
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
              value: this.goalWeight,
            });
            this.goalFatList.unshift({
              name: this.dates[index],
              value: this.goalFat,
            });
            this.goalTotalCalList.unshift({
              name: this.dates[index],
              value: this.goalCal,
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
              value: this.goalWeight,
            });
            this.goalFatList.unshift({
              name: this.dates[index],
              value: this.goalFat,
            });
            this.goalTotalCalList.unshift({
              name: this.dates[index],
              value: this.goalCal,
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
            this.loading = false;
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
    this.loading = true;
    this.typeOfGraph = 'week';
    let date = initialDate;
    this.preWeight = new Array();
    this.preFat = new Array();
    this.preTotalCal = new Array();
    this.goalWeightList = new Array();
    this.goalFatList = new Array();
    this.goalTotalCalList = new Array();
    this.dataWeight = new Array();

    if (event) {
      date = event.value;
    }
    this.subscription = this.averageService
      .getAveragesOfWeek(
        this.userId,
        this.datePipe.transform(date, 'yy.MM.dd(E)')
      )
      .subscribe(
        (datasOfWeeks: [AverageOfWeek[], AverageOfWeek[], AverageOfWeek[]]) => {
          if (datasOfWeeks !== undefined) {
            datasOfWeeks.forEach((dataOfWeeks: AverageOfWeek[], i) => {
              dataOfWeeks.forEach((dataOfWeek: AverageOfWeek, j) => {
                if (dataOfWeek !== undefined) {
                  switch (dataOfWeek.category) {
                    case 'weight':
                      this.preWeight.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: dataOfWeek.averageOfWeek,
                      });
                      this.goalWeightList.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: this.goalWeight,
                      });
                      break;
                    case 'fat':
                      this.preFat.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: dataOfWeek.averageOfWeek,
                      });
                      this.goalFatList.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: this.goalFat,
                      });
                      break;
                    case 'cal':
                      this.preTotalCal.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: dataOfWeek.averageOfWeek,
                      });
                      this.goalTotalCalList.unshift({
                        name: `${dataOfWeek.year}-${dataOfWeek.week}週`,
                        value: this.goalCal,
                      });
                      break;
                  }
                }

                if (
                  i === datasOfWeeks.length - 1 &&
                  j === dataOfWeeks.length - 1
                ) {
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
            this.loading = false;
          }
        }
      );
  }

  createGraphOfMonth(initialDate: Date, event?: MatDatepickerInputEvent<Date>) {
    this.loading = true;
    this.typeOfGraph = 'month';
    let date = initialDate;
    this.preWeight = new Array();
    this.preFat = new Array();
    this.preTotalCal = new Array();
    this.goalWeightList = new Array();
    this.goalFatList = new Array();
    this.goalTotalCalList = new Array();
    if (event) {
      date = event.value;
    }
    this.subscription = this.averageService
      .getAveragesOfMonth(
        this.userId,
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
            datasOfMonthList.forEach((dataOfMonthList: AverageOfMonth[], i) => {
              dataOfMonthList.forEach((dataOfMonth: AverageOfMonth, j) => {
                if (dataOfMonth !== undefined) {
                  switch (dataOfMonth.category) {
                    case 'weight':
                      this.preWeight.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: dataOfMonth.averageOfMonth,
                      });
                      this.goalWeightList.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: this.goalWeight,
                      });
                      break;
                    case 'fat':
                      this.preFat.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: dataOfMonth.averageOfMonth,
                      });
                      this.goalFatList.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: this.goalFat,
                      });
                      break;
                    case 'cal':
                      this.preTotalCal.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: dataOfMonth.averageOfMonth,
                      });
                      this.goalTotalCalList.unshift({
                        name: `${dataOfMonth.year}-${dataOfMonth.month}月`,
                        value: this.goalCal,
                      });
                      break;
                  }
                }
                if (
                  i === datasOfMonthList.length - 1 &&
                  j === dataOfMonthList.length - 1
                ) {
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
              this.loading = false;
            });
          }
        }
      );
  }

  createGraphOfYear(initialDate: Date, event?: MatDatepickerInputEvent<Date>) {
    this.loading = true;
    this.typeOfGraph = 'year';
    let date = initialDate;
    this.preWeight = new Array();
    this.preFat = new Array();
    this.preTotalCal = new Array();
    this.goalWeightList = new Array();
    this.goalFatList = new Array();
    this.goalTotalCalList = new Array();
    if (event) {
      date = event.value;
    }
    this.subscription = this.averageService
      .getAveragesOfYear(this.userId)
      .subscribe(
        (
          datasOfYearList: [AverageOfYear[], AverageOfYear[], AverageOfYear[]]
        ) => {
          if (datasOfYearList !== undefined) {
            datasOfYearList.forEach((dataOfYearList: AverageOfYear[], i) => {
              dataOfYearList.forEach((dataOfYear: AverageOfYear, j) => {
                if (dataOfYear !== undefined) {
                  switch (dataOfYear.category) {
                    case 'weight':
                      this.preWeight.unshift({
                        name: `${dataOfYear.year}年`,
                        value: dataOfYear.averageOfYear,
                      });
                      this.goalWeightList.unshift({
                        name: `${dataOfYear.year}年`,
                        value: this.goalWeight,
                      });
                      break;
                    case 'fat':
                      this.preFat.unshift({
                        name: `${dataOfYear.year}年`,
                        value: dataOfYear.averageOfYear,
                      });
                      this.goalFatList.unshift({
                        name: dataOfYear.year
                          ? `${dataOfYear.year}年`
                          : '未登録',
                        value: this.goalFat,
                      });
                      break;
                    case 'cal':
                      this.preTotalCal.unshift({
                        name: `${dataOfYear.year}年`,
                        value: dataOfYear.averageOfYear,
                      });
                      this.goalTotalCalList.unshift({
                        name: `${dataOfYear.year}年`,
                        value: this.goalCal,
                      });
                      break;
                  }
                }

                if (
                  i === datasOfYearList.length - 1 &&
                  j === dataOfYearList.length - 1
                ) {
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
            this.loading = false;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
