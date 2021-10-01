import React from "react";
import c3 from "c3";
import "./Chart.css";

export default function YearonYear() {
  //connect airtable
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
  //import moment
  var moment = require('moment');
  const currentyear = moment().format('YYYY');

  for(let year=currentyear-2; year<currentyear+1; year++){
    getData(year);
  }

  function getData(year){
    var newData = [];
    base('buy').select({
      view: "Grid view" ,
      filterByFormula: "(YEAR({buy_date}) = '" +year+ "')",
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          newData.push(record);
        });
        fetchNextPage();

      }, function done(err) {
        if (err) { console.error(err); return; }
        Month(newData,year);
      });
  }
  var result =[];
  function Month(newData,year){
      var price = [];
      for(let month=1;month<13;month++){
        var total_price = 0;
        newData.forEach(function(data){
            if(parseInt(moment(data.fields.buy_date).format('M'),10) === month){
              total_price += data.fields.buy_actualprice;
            }
        });
        price.push(total_price);
      }
      console.log(price);
      result.push([year.toString(),...price]);
      console.log(result);
      drawChart(result);
  };

  function drawChart(result){
    c3.generate({
      bindto: "#chart",
      data: {
        columns: result,
        type: "bar",
      },
      axis:{
        x:{
          type:'category',
          categories:['1','2','3','4','5','6','7','8','9','10','11','12'],
          label:{
            text:'月份',
            position: "outer-middle",
          }
        },
        y:{
          label:{
            text:'金額',
            position:'outer-middle',
          }
        }
      }
    });
  };
  
  return(
    <div id="chart" />
  )
}

