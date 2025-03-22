import { Component, VERSION ,OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartComponent {
  public options: any = {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    accessibility: {
        description: '',
    },
    title: {
        text: 'Height Versus Weight'
    },
    subtitle: {
        text: ''
    },
   xAxis: {
        title: {
            enabled: true,
            text: 'Height (cm)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Weight (kg)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts?.defaultOptions?.chart?.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            }
        }
    },
    series: [{
        name: 'Female',
        color: 'rgba(223, 83, 83, .5)',
        data: []

    }, {
        name: 'Male',
        color: 'rgba(119, 152, 191, .5)',
        data: []
    }]
  }
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  updateFlag = false; // To trigger chart update
  dataLoaded = false; // Ensure data is loaded before rendering chart
  constructor(private http: HttpClient) { 
   
  }

  
  fetchChartData() {
    const apiUrl = `https://www.highcharts.com/samples/data/olympic2012.json`;  // Replace with actual API
    this.http.get<any[]>(apiUrl).subscribe(data => {
      console.log(data);
      const seriesData = this.formatData(data);
      console.log(seriesData, 'seriesData');
      this.initChart(seriesData);
      this.dataLoaded = true;
      this.updateFlag = true; // Trigger update
    });
  }

  ngOnInit(){
    this.initDefaultChart(); 
    this.fetchChartData();
  }

  initDefaultChart() {
    this.chartOptions = {
      chart: { type: 'scatter', zoomType: 'xy' },
      title: { text: 'Loading Data...' },
      xAxis: { title: { text: 'Height (meters)' } },
      yAxis: { title: { text: 'Weight (kg)' } },
      series: [[1.8, 80], [1.6, 60], [1.9, 90]]  // ✅ Empty series to avoid Highcharts crash
    };
  }

  formatData(apiData: any[]): any {
    const sportColors: { [key: string]: string } = {
      basketball: 'red',
      volleyball: 'blue',
      triathlon: 'green'
    };

    // Group data by sport
    const groupedData = apiData.reduce((acc, item) => {
      if (!acc[item.sport]) {
        acc[item.sport] = [];
      }
      acc[item.sport].push([item.height, item.weight]);  // Scatter plot needs [x, y] format
      return acc;
    }, {} as { [key: string]: any[] });

    // Convert to Highcharts series format
    return Object.keys(groupedData).map(sport => ({
      name: sport,
      color: sportColors[sport] || 'gray',
      type: 'scatter',
      data: groupedData[sport]
    }));
  }

  initChart(seriesData: any) {
    this.chartOptions = {
      chart: { type: 'scatter', zoomType: 'xy' },
      title: { text: 'TestAthlete Height vs Weight by Sport' },
      xAxis: { title: { text: 'Height (meters)' },
      tickLength: 10,  // Removes tick marks
      },
      yAxis: { title: { text: 'Weight (kg)' } },
      tooltip: {
        pointFormat: 'Height: {point.x} m, Weight: {point.y} kg'
      },
      series: seriesData
    };
  }
}
