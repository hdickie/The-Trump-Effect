  var svg = d3.select("#dashboard"),
    margin = {top: 35, right: 20, bottom: 20, left: 20},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    //3 vars. b1 is height of p2, b2 is width of p1, b3 is height of p4
    var b1 = 260, b2 = width/2, b3 = 66;
    var pad = 5;
    var p4_x = width, p4_y = b3, p4_dx = 0, p4_dy = height - p4_y;
    
    var p1_dx = 0, p1_dy = 0, p1_x = b2, p1_y = height - p4_y;
    var p2_dx =p1_x, p2_dy = 0, p2_x = width - p1_x, p2_y = b1;
    var p3_dx = p1_x, p3_dy = p2_y, p3_x = width - p1_x, p3_y = height - p2_y - p4_y;
 
    var c1 = "none", c2 = "none", c3 = "none", c4 = "none";
    
   g.append("rect")
    .attr("width",p1_x)
    .attr("height",p1_y)
    .attr("fill",c1);
    
    g.append("rect")
    .attr("width",p2_x)
    .attr("height",p2_y)
    .attr("x",p2_dx)
    .attr("y",p2_dy)
    .attr("fill",c2);
    
    g.append("rect")
    .attr("width",p3_x)
    .attr("height",p3_y)
    .attr("x",p3_dx)
    .attr("y",p3_dy)
    .attr("fill",c3);
    
    g.append("rect")
    .attr("width",p4_x)
    .attr("height",p4_y)
    .attr("x",p4_dx)
    .attr("y",p4_dy)
    .attr("fill",c4);
  
    var p2 = g.append("g").attr("transform", "translate(" + p1_x + "," + 0 + ")");
    
    var p3 = g.append("g").attr("transform", "translate(" + p1_x + "," + p2_y + ")");
    
    var p4 = g.append("g").attr("transform", "translate(" + 0 + "," + p1_y + ")");
    
    //signature
    svg.append("text")
      .attr("x",width-90)
      .attr("y",10)
      .attr("font-family","Georgia")
      .style("font-size",7)
      .style("fill","white")
      .text("https://hdickie.github.io/portfolio/");
    
    function drawBarChart(svg) {
      
      var possibleResponses = ["Strongly Disagree","Disagree", "Neither","Agree", "Strongly Agree"];
      var responses = d3.scaleBand().domain(possibleResponses).rangeRound([0, p1_x - 30 - pad])
    .paddingInner(0.1).paddingOuter(0.05);
      
      var barScale = d3.scaleLinear().domain([0,359]).rangeRound([p1_y - 15 - 2*pad, 0]).nice();
      
      g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate("+ 30 +"," + (p1_y - 20) + ")")
      .call(d3.axisBottom(responses)
           );
        
        g.append("g")
          .attr("class", "axis axis--y")
          .attr("transform","translate(30,5)")
          .call(d3.axisLeft(barScale)
        );
        
        g.append("g")
          .attr("class","gridlines y-gridlines")
          .attr("transform","translate(30,5)")
          .style("opacity",0.3)
          .call(d3.axisRight(barScale)
                .ticks(7)
                .tickSize(p1_x - 30)
                .tickSizeOuter(0)
                .tickFormat("")
      );
      
      var t1_xoff = 55, t1_yoff = -15;
      
      g.append("text")
        .attr("x",t1_xoff)
        .attr("y",t1_yoff)
        .attr("font-family","Georgia")
        .text("\"I'd rather trust my own judgment than the");
      
      g.append("text")
        .attr("x",t1_xoff + 91)
        .attr("y",t1_yoff + 18)
        .attr("font-family","Georgia")
        .text("opinion of experts.\"");
      
      d3.csv("finalBarChart.csv", function(error,data) {
        if (error) throw error;
        
        var bars = g.selectAll("bar").data(data).enter().append("rect")
          .attr("class", "bar")
          .attr("width", responses.bandwidth())
          .attr("stroke","grey")
          .attr("fill","darkblue")
          .attr("transform","translate(31,-20)")
          .attr("x", function(d) {
            return responses(d.response);
          })
          .attr("y", function(d) {
            return barScale(d.value);
          })
          .attr("height", function(d) {
            return p1_y - barScale(d.value);
          });
          
          var barValue = g.append("text")
            .attr("x",35)
            .attr("y",25)
            .attr("stroke","none")
            .attr("fill","grey")
            .attr("font-family","Georgia")
            .style("visibility","hidden");
        

        
          bars.on("click",function(d){
            
            var maxVal = -1;
            var maxColVals = [7,28,78,49,34];
            
            var cells = svg._groups[0][0].childNodes[0].childNodes[4].childNodes[31].childNodes;
            
            var c1 = [], c2 = [], c3 = [], c4 = [], c5 = [];
            
            for (var i = 0 ; i < 13 ; ++i) {
              c1.push(cells[i]);
              c2.push(cells[13 + i]);
              c3.push(cells[26 + i]);
              c4.push(cells[39 + i]);
              c5.push(cells[52 + i]);
            }
                      
                    



              var currCol = [];
              
              switch(d.response) {
                case "Strongly Disagree":
                  maxVal = maxColVals[0];
                  currCol = c1;
                  break;
                case "Disagree":
                  maxVal = maxColVals[1];
                  currCol = c2;
                  break;
                case "Neither":
                  maxVal = maxColVals[2];
                  currCol = c3;
                  break;
                case "Agree":
                  maxVal = maxColVals[3];
                  currCol = c4;
                  break;
                case "Strongly Agree":
                  maxVal = maxColVals[4];
                  currCol = c5;
                  break;
                default:
                  console.log("Could not identify cell class in bar.on('click')")
                  break;
              }
              
              
              
              var srtd = currCol.slice(0).sort(function(a,b){
                
                a_val = a.classList[a.classList.length - 1];
                b_val = +b.classList[b.classList.length - 1]
                
                return b_val - a_val;
              });
            
              var color = d3.scaleSequential(d3.interpolateReds).domain([0,maxVal]); 
            
              console.log(srtd);
              console.log(c1);
            
              for (var i = 0 ; i < 13 ; ++i ) {
                //transition from c1 to srtd
              }
              
              // Copy-on-write since tweens are evaluated after a delay.
//               var x0 = x.domain(data.sort(this.checked
//                   ? function(a, b) { return b.frequency - a.frequency; }
//                   : function(a, b) { return d3.ascending(a.letter, b.letter); })
//                   .map(function(d) { return d.letter; }))
//                   .copy();

//               svg.selectAll(".bar")
//                   .sort(function(a, b) { return x0(a.letter) - x0(b.letter); });

//               var transition = svg.transition().duration(750),
//                   delay = function(d, i) { return i * 50; };

//               transition.selectAll(".bar")
//                   .delay(delay)
//                   .attr("x", function(d) { return x0(d.letter); });

//               transition.select(".x.axis")
//                   .call(xAxis)
//                 .selectAll("g")
//                   .delay(delay);
            
          });
        
          bars.on("mouseout",function(d){
            d3.select(this).classed("active", false);
            barValue.style("visibility","hidden");
            
            var cells = svg._groups[0][0].childNodes[0].childNodes[4].childNodes[31].childNodes;
            
            var color = d3.scaleSequential(d3.interpolateReds).domain([0,78]);
            
            //first, bring targetColumn to full brightness
            var currentValue = "";
            for (var i = 0 ; i < 65 ; ++i) {

              currentValue = +cells[i].classList[cells[i].classList.length - 1];
              //console.log(currentValue);    //current cell color
              cells[i].style.fill = color(currentValue);
            }  
          });
        
          bars.on("mouseover",function(d){
            
            d3.select(this).classed("active", true);
            barValue
              .text(d.response + ": " + d.value);
            
            barValue.style("visibility", "visible");
            
            var cells = svg._groups[0][0].childNodes[0].childNodes[4].childNodes[31].childNodes;            
            
            var t_column = [];
            var ot_columns = [];
            var color = d3.scaleSequential(d3.interpolateReds).domain([0,78]);
            var grey = d3.scaleSequential(d3.interpolateGreys).domain([0,78]);
            var maxColVals = [7,28,78,49,34];
            

            
            switch(d.response) {
              case "Strongly Disagree":
                
                //collect cells in column
                for (var i = 0 ; i < 13 ; ++i) {
                  t_column.push(cells[i]);
                }
                //collect all other cells
                for (var i = 13 ; i < 65 ; ++i) {
                  ot_columns.push(cells[i]);
                }
                
                //first, bring targetColumn to full brightness
                var currentValue = "";
                color.domain([0,maxColVals[0]]);
                for (var i = 0 ; i < 13 ; ++i) {
                  
                  currentValue = +t_column[i].classList[t_column[i].classList.length - 1];
                  //console.log(currentValue);    //current cell color
                  t_column[i].style.fill = color(currentValue);
                }
                
                //second, grey out others
                for (var i = 0 ; i < 52 ; ++i) {
                  dimmedValue = "";
                  currentValue = +ot_columns[i].classList[ot_columns[i].classList.length - 1];
                  ot_columns[i].style.fill = grey(currentValue);
                }           
                break;
                case "Disagree":
                
                
                //collect other cells
                for (var i = 0 ; i < 13 ; ++i) {
 
                  ot_columns.push(cells[i]);
                }
                //collect cells in column
                for (var i = 13 ; i < 26 ; ++i) {

                  t_column.push(cells[i]);
                }
                //collect other cells
                for (var i = 26 ; i < 65 ; ++i) {
                  ot_columns.push(cells[i]);
                }
                
                //first, bring targetColumn to full brightness
                var currentValue = "";
                color.domain([0,maxColVals[1]]);
                for (var i = 0 ; i < 13 ; ++i) {
                  currentValue = +t_column[i].classList[t_column[i].classList.length - 1];
                  //console.log(currentValue);    //current cell color
                  t_column[i].style.fill = color(currentValue);
                }
                
                //second, grey out others
                for (var i = 0 ; i < 52 ; ++i) {
                  dimmedValue = "";
                  currentValue = +ot_columns[i].classList[ot_columns[i].classList.length - 1];
                  ot_columns[i].style.fill = grey(currentValue);
                }   
                
                
                break;
                case "Neither":
                
                
                //collect other cells
                for (var i = 0 ; i < 26 ; ++i) {
 
                  ot_columns.push(cells[i]);
                }
                //collect cells in column
                for (var i = 26 ; i < 39 ; ++i) {
                  t_column.push(cells[i]);
                }
                //collect other cells
                for (var i = 39 ; i < 65 ; ++i) {
                  ot_columns.push(cells[i]);
                }
                
                //first, bring targetColumn to full brightness
                var currentValue = "";
                color.domain([0,maxColVals[2]]);
                for (var i = 0 ; i < 13 ; ++i) {
                  currentValue = +t_column[i].classList[t_column[i].classList.length - 1];
                  //console.log(currentValue);    //current cell color
                  t_column[i].style.fill = color(currentValue);
                }
                
                //second, grey out others
                for (var i = 0 ; i < 52 ; ++i) {
                  dimmedValue = "";
                  currentValue = +ot_columns[i].classList[ot_columns[i].classList.length - 1];
                  ot_columns[i].style.fill = grey(currentValue);
                }   
                
                
                break;
                case "Agree":
                
                
                                //collect other cells
                for (var i = 0 ; i < 39 ; ++i) {
 
                  ot_columns.push(cells[i]);
                }
                //collect cells in column
                for (var i = 39 ; i < 52 ; ++i) {
                  t_column.push(cells[i]);
                }
                //collect other cells
                for (var i = 52 ; i < 65 ; ++i) {
                  ot_columns.push(cells[i]);
                }
                
                //first, bring targetColumn to full brightness
                var currentValue = "";
                color.domain([0,maxColVals[3]]);

                for (var i = 0 ; i < 13 ; ++i) {

                  currentValue = +t_column[i].classList[t_column[i].classList.length - 1];
                  //console.log(currentValue);    //current cell color
                  t_column[i].style.fill = color(currentValue);
                }
                
                //second, grey out others
                for (var i = 0 ; i < 52 ; ++i) {
                  dimmedValue = "";
                  currentValue = +ot_columns[i].classList[ot_columns[i].classList.length - 1];
                  ot_columns[i].style.fill = grey(currentValue);
                }   
                
                
                break;
                case "Strongly Agree":
                
                
                                                //collect other cells
                for (var i = 0 ; i < 52 ; ++i) {
 
                  ot_columns.push(cells[i]);
                }

                //collect other cells
                for (var i = 52 ; i < 65 ; ++i) {
                  t_column.push(cells[i]);
                }
                
                //first, bring targetColumn to full brightness
                var currentValue = "";
                color.domain([0,maxColVals[4]]);

                for (var i = 0 ; i < 13 ; ++i) {

                  currentValue = +t_column[i].classList[t_column[i].classList.length - 1];
                  //console.log(currentValue);    //current cell color
                  t_column[i].style.fill = color(currentValue);
                }
                
                //second, grey out others
                for (var i = 0 ; i < 52 ; ++i) {
                  dimmedValue = "";
                  currentValue = +ot_columns[i].classList[ot_columns[i].classList.length - 1];
                  ot_columns[i].style.fill = grey(currentValue);
                }   
                
                
                break;
              default:
                console.log("Could not match column class of heatmap cell")
                break;
            }
            
            //clicking on a bar greys out the rest of the map except that column, AND changes the gradient on that column
            

          })
      });
    }
    
        function drawPieChart(svg) {
      
      var r = 40,negx = p3_x/8,posx=3*p3_x/8, yoff=p3_y*9.5/12;
      
      p3.append("text")
        .attr("x",negx - r/2 - 5)
        .attr("y",yoff - r - 5)
        .style("font-size",12)
        .attr("font-family","Georgia")
        .text("Negative");
      
      p3.append("text")
        .attr("x",posx - r/2 - 5)
        .attr("y",yoff - r - 5)
        .style("font-size",12)
        .attr("font-family","Georgia")
        .text("Positive");
      
      p3.append("text")
        .attr("x",negx - r/1.5 )
        .attr("y",yoff/3)
        .attr("font-family","Georgia")
        .text("Vote by Worldview");
      
      var lx_o = 240, ly_o = p3_y*0.8, fontSz = 12, h = 15;
      
      p3.append("text")
        .attr("x",lx_o)
        .attr("y",ly_o)
        .style("font-size",fontSz)
        .attr("font-family","Georgia")
        .text("Hillary Clinton");
      
      p3.append("rect")
        .attr("width",10)
        .attr("height",10)
        .attr("x",lx_o - 13)
        .attr("y",ly_o - 10)
        .attr("font-family","Georgia")
        .style("fill","darkblue");
      
      p3.append("text")
        .attr("x",lx_o)
        .attr("y",ly_o + h)
        .style("font-size",fontSz)
        .attr("font-family","Georgia")
        .text("Donald Trump");
      
      p3.append("rect")
        .attr("width",10)
        .attr("height",10)
        .attr("x",lx_o - 13)
        .attr("y",ly_o + h - 10)
        .style("fill","rgb(206, 22, 22)");
      
      p3.append("text")
        .attr("x",lx_o)
        .attr("y",ly_o + 2*h)
        .style("font-size",fontSz)
        .attr("font-family","Georgia")
        .text("Other");
      
      p3.append("rect")
        .attr("width",10)
        .attr("height",10)
        .attr("x",lx_o - 13)
        .attr("y",ly_o + 2*h - 10)
        .style("fill","green");
      
      p3.append("text")
        .attr("x",lx_o)
        .attr("y",ly_o + 3*h)
        .style("font-size",fontSz)
        .attr("font-family","Georgia")
        .text("Did Not Vote");
      
      p3.append("rect")
        .attr("width",10)
        .attr("height",10)
        .attr("x",lx_o - 13)
        .attr("y",ly_o + 3*h - 10)
        .style("fill","grey");
      
//       p3.append("rect")
//        .attr("x",lx_o - 15)
//        .attr("y",ly_o + h*3 + 6)
//        .attr("width",100)
//        .attr("height",70)
//        .style("fill","grey");
      
      d3.csv("finalPieChart.csv",function(error,data){
        if (error) throw error;
        
        var hillary = d3.arc()
          .startAngle(0)
          .endAngle(function(d){return d.Hillary*Math.PI/180})
          .innerRadius(0)
          .outerRadius(r)
          .padAngle(0);
        
        var hil = p3.selectAll("hillary").data(data).enter().append("path")
          .attr("transform",function(d){      
            if (d.worldview == "negativeWorldview") {
              return "translate("+negx+","+yoff+")";
            }
            if (d.worldview == "positiveWorldview") {
              return "translate("+posx+","+yoff+")";
            }
          })
          .attr("d",hillary)
          .style("fill","darkblue");
        
        var trump = d3.arc()
          .startAngle(function(d){return d.Hillary*Math.PI/180})
          .endAngle(function(d){return d.Trump*Math.PI/180})
          .innerRadius(0)
          .outerRadius(r)
          .padAngle(0);
        
        var tr = p3.selectAll("trump").data(data).enter().append("path")
          .attr("transform",function(d){      
            if (d.worldview == "negativeWorldview") {
              return "translate("+negx+","+yoff+")";
            }
            if (d.worldview == "positiveWorldview") {
              return "translate("+posx+","+yoff+")";
            }
          })
          .attr("d",trump)
          .style("fill","rgb(206, 22, 22)");
        
        var other = d3.arc()
          .startAngle(function(d){return d.Trump*Math.PI/180})
          .endAngle(function(d){return d.Other*Math.PI/180})
          .innerRadius(0)
          .outerRadius(r)
          .padAngle(0);
        
        var ot = p3.selectAll("other").data(data).enter().append("path")
          .attr("transform",function(d){      
            if (d.worldview == "negativeWorldview") {
              return "translate("+negx+","+yoff+")";
            }
            if (d.worldview == "positiveWorldview") {
              return "translate("+posx+","+yoff+")";
            }
          })
          .attr("d",other)
          .style("fill","green");
        
        var none = d3.arc()
          .startAngle(function(d){return d.Other*Math.PI/180})
          .endAngle(function(d){return d["Did not vote"]*Math.PI/180})
          .innerRadius(0)
          .outerRadius(r)
          .padAngle(0);
        
        var no = p3.selectAll("none").data(data).enter().append("path")
          .attr("transform",function(d){      
            if (d.worldview == "negativeWorldview") {
              return "translate("+negx+","+yoff+")";
            }
            if (d.worldview == "positiveWorldview") {
              return "translate("+posx+","+yoff+")";
            }
          })
          .attr("d",none)
          .style("fill","grey");
        
        var dodx = 224, dody = 30;
        
        //interactvity. hil, tr, ot, no
        var cand = p3.append("text")
          .style("font-size",17)
          .attr("x",dodx)
          .attr("y",dody)
          .attr("font-family","Georgia")
          .text("Candidate");
        
        var perc = p3.append("text")
          .style("font-size",25)
          .attr("x",dodx + 47)
          .attr("y",dody + 34)
          .attr("font-family","Georgia")
          .text("%");
        
        var cnt = p3.append("text")
          .style("font-size",25)
          .attr("x",dodx - 2)
          .attr("y",dody + 34)
          .attr("font-family","Georgia")
          .text("#");
        
        hil.on("mouseover",function(d){
          cand.text("Hillary Clinton");
          perc.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "37.9%";
            }
            if (d.worldview == "negativeWorldview") {
              return "17.8%";
            }
          });
          cnt.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "199";
            }
            if (d.worldview == "negativeWorldview") {
              return "94";
            }
          });
        })
        
        tr.on("mouseover",function(d){
          cand.text("Donald Trump");
          perc.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "15.4%";
            }
            if (d.worldview == "negativeWorldview") {
              return "45.2%";
            }
          });
          cnt.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "81";
            }
            if (d.worldview == "negativeWorldview") {
              return "238";
            }
          });
        })
        
        ot.on("mouseover",function(d){
          cand.text("Other");
          perc.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "10.7%";
            }
            if (d.worldview == "negativeWorldview") {
              return "6.3%";
            }
          });
          cnt.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "56";
            }
            if (d.worldview == "negativeWorldview") {
              return "33";
            }
          });
        })
        
        no.on("mouseover",function(d){
          cand.text("Did Not Vote");
          perc.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "36%";
            }
            if (d.worldview == "negativeWorldview") {
              return "30.7%";
            }
          });
          cnt.text(function(){
            if (d.worldview == "positiveWorldview") {
              return "189";
            }
            if (d.worldview == "negativeWorldview") {
              return "162";
            }
          });
        })
        
        function hideDoD(){
          cand.text("");
          perc.text("");
          cnt.text("");
        }
        
        hil.on("mouseout",hideDoD);
        tr.on("mouseout",hideDoD);
        ot.on("mouseout",hideDoD);
        no.on("mouseout",hideDoD);
      });
      
      
    }
    
    function drawStackedBarChart(svg) {
      var labels = ["Prefer not to say","Under 200","200 - 400","400 - 800","800 - 1600","1600 - 2400","2400 - 3200","3200 - 4800","4800 - 6400","6400 - 8000","8000 - 9600","9600 - 12000","More than 12000"];
      
      var barPad = 10, labelPad = 43, labelY = 39, labelX = 8, labFontSz = 14;
      var mapping = d3.scaleLinear().domain([0,1]).range([0,width - labelPad - barPad*2 - 1]);
      var cls = ["rgb(0,0,0)",d3.interpolateSpectral(0.076),d3.interpolateSpectral(0.154),d3.interpolateSpectral(0.231),d3.interpolateSpectral(0.308),d3.interpolateSpectral(0.385),d3.interpolateSpectral(0.462),d3.interpolateSpectral(0.538),d3.interpolateSpectral(0.615),d3.interpolateSpectral(0.692),d3.interpolateSpectral(0.769),d3.interpolateSpectral(0.846),d3.interpolateSpectral(0.923),d3.interpolateSpectral(1)];
      
      var labToIndex = new Map();
      var color = new Map();
      for ( var i = 0 ; i < 13 ; ++i ) {
        color.set(labels[i],cls[i]);
        labToIndex.set(labels[i],i);
      }
      
      var h = 11, lxoff = p3_x*0.85, lyoff = 10;
      
      
      for (var i = 0 ; i < 13 ; ++i) {
        p3.append("rect")
          .attr("x",lxoff - 12)
          .attr("y",i*h + lyoff - 8)
          .attr("width",10)
          .attr("height",10)
          .style("fill",color.get(labels[i]))
        
        p3.append("text")
          .attr("x",lxoff)
          .style("font-size",10)
          .attr("y",i*h + lyoff)
          .attr("font-family","Georgia")
          .text(labels[i])
      }
      
      p4.append("text")
        .attr("y",20)
        .attr("font-family","Georgia")
        .text("Income Strata in City and Countryside")
      
      p4.append("text")
        .attr("x",labelX)
        .attr("y",labelY)
        .style("font","Georgia")
        .style("font-size",labFontSz)
        .style("fill","grey")
        .attr("font-family","Georgia")
        .text("Urban")
      
      p4.append("text")
        .attr("x",labelX + 8)
        .attr("y",labelY + p4_y*0.3)
        .style("font","Georgia")
        .style("font-size",labFontSz)
        .style("fill","grey")
        .attr("font-family","Georgia")
        .text("Rural")
      
      p4.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate("+ (labelPad + 10) +"," + (p4_y) + ")")
      .call(d3.axisBottom(mapping)
           .ticks(10,"%"));
      
      d3.csv("finalStackedBarChart.csv",function(error, data){
        if (error) throw error;
        
        var cDiffs = [], rDiffs = [];
        for (var i = 0 ; i < 12 ; ++i) {
          cDiffs.push((data[i].city -data[i+1].city));
          rDiffs.push((data[i].rural -data[i+1].rural));
        }
        cDiffs.push(+(data[12].city));
        rDiffs.push(+(data[12].rural));
        
        var citySeg = d3.scaleBand().domain(labels).range(cDiffs);
         var ruralSeg = d3.scaleBand().domain(labels).range(rDiffs);
        

        
        var cPos = [116,211,262,306,383,480,570,658,719,749,772,798,850];
        var rPos = [125,230,267,312,393,507,597,667,728,757,770,787,850];
        
        var cLabPos = new Map(), rLabPos = new Map();
        for ( var i = 0 ; i < 13 ; ++i ) {
          cLabPos.set(labels[i],cPos[i]);
          rLabPos.set(labels[i],rPos[i]);
        }
        
        var barSegments = p4.selectAll(".barSegment").data(data).enter().append("rect")
          .attr("class", "barSegment")
          .attr("x",function(d){
            return barPad + labelPad;
          })
          .attr("width",function(d){
            return mapping(d.city);
          })
          .attr("fill",function(d){
            return color.get(d.stratum);
          })
          .attr("height",15)
          .attr("y",p4_y*0.43);

        var barSegments = p4.selectAll("barSegment").data(data).enter().append("rect")
          .attr("class", "barSegment")
          .attr("x",function(d){
            return barPad + labelPad;
          })
          .attr("width",function(d){
            return mapping(d.rural);
          })
          .attr("fill",function(d){
            return color.get(d.stratum);
          })
          .attr("height",15)
          .attr("y",p4_y*0.72);
        
        var cityValue = p4.append("text")
            .attr("stroke","none")
            .attr("fill","black")
            .style("font-size",12)
          .attr("font-family","Georgia")
            .style("visibility","hidden");
        
        var ruralValue = p4.append("text")
            .attr("stroke","none")
            .attr("fill","black")
            .style("font-size",12)
          .attr("font-family","Georgia")
            .style("visibility","hidden");
        
        var yoff = 10, xoff = 20;
        
        barSegments.on("mouseout",function(d){
          var cells = svg._groups[0][0].childNodes[0].childNodes[4].childNodes[31].childNodes;
            
          var color = d3.scaleSequential(d3.interpolateReds).domain([0,78]);

          //first, bring targetColumn to full brightness
          var currentValue = "";
          for (var i = 0 ; i < 65 ; ++i) {

            currentValue = +cells[i].classList[cells[i].classList.length - 1];
            //console.log(currentValue);    //current cell color
            cells[i].style.fill = color(currentValue);
          }  
        });
        
        barSegments.on("mouseover",function(d){
          
          var cVal = cDiffs[12-labToIndex.get(d.stratum)];
          var rVal = rDiffs[12-labToIndex.get(d.stratum)];
          
          
          var cityText = "";
          if (cVal.toString().substring(2,3) == "0") {
            cityText = cVal.toString().substring(3,4) + "." + cVal.toString().substring(4,6) + "%";
          } else {
            cityText = cVal.toString().substring(2,4) + "." + cVal.toString().substring(4,6) + "%";
          }
          
          var ruralText = "";
          if (rVal.toString().substring(2,3) == "0") {
            ruralText = rVal.toString().substring(3,4) + "." + rVal.toString().substring(4,6) + "%";
          } else {
            ruralText = rVal.toString().substring(2,4) + "." + rVal.toString().substring(4,6) + "%";
          }
          
          if (d.stratum == labels[0]) {
            cityValue.style("fill","white");
            ruralValue.style("fill","white");
          } else {
            cityValue.style("fill","black");
            ruralValue.style("fill","black");
          }
          
          //make 2 scales- one for label position and 1 for color
            cityValue
              .attr("x",cLabPos.get(d.stratum)) 
              .attr("y",p4_y*0.43 + yoff)
              .text(cityText)
              .style("visibility", "visible");
          
          ruralValue
              .attr("x",rLabPos.get(d.stratum)) 
              .attr("y",p4_y*0.72 + yoff)
              .text(ruralText)
              .style("visibility", "visible");
          
          
          //heatmap highlighting
          var cells = svg._groups[0][0].childNodes[0].childNodes[4].childNodes[31].childNodes;
          //console.log(cells);
          //console.log(labToIndex.get(d.stratum))
          
          var index = labToIndex.get(d.stratum);
          
          //console.log(index)
          var t_row = [], nont_rows = [];
          
          for (var i = 0 ; i < 65 ; ++i) {
            if (i%13 == index) {
              t_row.push(cells[i]);
            } else {
              nont_rows.push(cells[i]);
            }
          }
          
          //bring target row to full intensity
          var rowVals = [];
          var rowMax = -1;
          for (var i = 0 ; i < 5 ; ++i) {

            if (+(t_row[i].classList[t_row[i].classList.length-1]) > rowMax) {
              rowMax = +(t_row[i].classList[t_row[i].classList.length-1]);
            }
            rowVals.push(+(t_row[i].classList[t_row[i].classList.length-1]));
          }
          
          
          var color = d3.scaleSequential(d3.interpolateReds).domain([0,rowMax]);
          rowMax = -1;
          
          for (var i = 0 ; i < 5 ; ++i) {
            t_row[i].style.fill = color(rowVals[i]);
          }
          
          var grey = d3.scaleSequential(d3.interpolateGreys).domain([0,78]);
          
          //grey out all other rows
          var currVal = 0;
          for (var i = 0 ; i < 60 ; ++i ) {
            currVal = nont_rows[i].classList[nont_rows[i].classList.length - 1];
            nont_rows[i].style.fill = grey(currVal);
          }
          
        });
          
      });
    }
    
    

    
    function drawHeatmap(svg) {
      
      var labels = ["Prefer not to say","Under 200","200 - 400","400 - 800","800 - 1600","1600 - 2400","2400 - 3200","3200 - 4800","4800 - 6400","6400 - 8000","8000 - 9600","9600 - 12000","More than 12000"];
      
      var loff = 75;
      
      var cellWidth = (p2_x-loff)/5, cellHeight = p2_y/13;
      
      var lab_o = new Map();
      lab_o.set(labels[0],5);
      lab_o.set(labels[1],25);
      lab_o.set(labels[2],30);
      lab_o.set(labels[3],30);
      lab_o.set(labels[4],26);
      lab_o.set(labels[5],20);
      lab_o.set(labels[6],18);
      lab_o.set(labels[7],18);
      lab_o.set(labels[8],17);
      lab_o.set(labels[9],17);
      lab_o.set(labels[10],17);
      lab_o.set(labels[11],14);
      lab_o.set(labels[12],0);
      
      for ( var i = 0 ; i < 13 ; ++i ) {
        p2.append("text")
          .style("font-size",10)
          .attr("font-family","Georgia")
          .attr("x",lab_o.get(labels[i]))
          .attr("y",cellHeight*(i+0.75))
          .text(labels[i]);
      }
      
      var responses = ["Strongly Disagree","Disagree","Neither","Agree","Strongly Agree"];
      p2.append("text")
        .attr("x",cellWidth)
        .attr("y",-2)
        .style("font-size",9)
        .attr("font-family","Georgia")
        .text(responses[0]);
      
      p2.append("text")
        .attr("x",cellWidth*2.25)
        .attr("y",-2)
        .style("font-size",9)
        .attr("font-family","Georgia")
        .text(responses[1]);
      
      p2.append("text")
        .attr("x",cellWidth*3.25)
        .attr("y",-2)
        .style("font-size",9)
        .attr("font-family","Georgia")
        .text(responses[2]);
      
      p2.append("text")
        .attr("x",cellWidth*4.25)
        .attr("y",-2)
        .style("font-size",9)
        .attr("font-family","Georgia")
        .text(responses[3]);
      
      p2.append("text")
        .attr("x",cellWidth*5)
        .attr("y",-2)
        .style("font-size",9)
        .attr("font-family","Georgia")
        .text(responses[4]);
      
      p2.append("text")
        .attr("x",p2_x/4)
        .attr("y",-12)
        .attr("font-family","Georgia")
        .text("Own Judgment or Experts")
      
      var color = d3.scaleSequential(d3.interpolateReds).domain([0,78]);
      
      var gradient = svg.append("defs")
        .append("linearGradient")
          .attr("id", "gradient")
          .attr("x1", "100%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "100%")
          .attr("spreadMethod", "pad");

      gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "rgb(103,0,13)")
          .attr("stop-opacity", 1);

      gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "rgb(255,243,237)")
          .attr("stop-opacity", 1);
      
      var grad_xo = 342, grad_yo = 15;
      
      p3.append("rect")
        .attr("transform","translate("+grad_xo+ "," + grad_yo + ")")
        .attr("width", 15)
          .attr("height", p3_y)
          .style("fill", "url(#gradient)");
      
      p3.append("text")
        .attr("x",grad_xo)
        .attr("y",grad_yo - 3)
        .style("font-size",12)
        .attr("font-family","Georgia")
        .text("87");
      
      p3.append("text")
        .attr("x",grad_xo + 4)
        .attr("y",p3_y + grad_yo + 8)
        .style("font-size",12)
        .attr("font-family","Georgia")
        .text("0");
         
      var strata = d3.scaleBand().domain(labels).rangeRound([0,p2_y]);
      var resp = d3.scaleBand().domain(responses).rangeRound([cellWidth,p2_x]);
      
      d3.csv("finalHeatmap.csv",function(error,data){
        if (error) throw error;
        
        var heatmap = p2.selectAll(".cell").data(data).enter().append("g")
          .attr("transform","translate("+cellWidth+","+0+")");
        
        var col1 = heatmap.selectAll(".sdis").data(data).enter().append("rect")
          .attr("x",0)
          .attr("y",function(d){
            return strata(d.stratum);
          })
          .attr("width",cellWidth)
          .attr("height",cellHeight)
          .attr("class",function(d){
            return d.stratum + " SD " + d["Strongly Disagree"];
        })
          .style("fill",function(d){
            return color(d["Strongly Disagree"]);
          })
          .each(function(d){
            d.resp1 = "Strongly Disagree";
          });
          
        var heatmapLabel = p2.append("text").style("fill","grey").attr("font-family","Georgia");
        
        col1.on("mouseover",function(d){
          d3.select(this).classed("active", true);
          
          heatmapLabel
            .attr("x",function(){
            return resp(d.resp1) + cellWidth/2 - 8;
          })
            .attr("y",function(){
              return strata(d.stratum) + cellHeight/2 + 4;
          })
            .text(function(){
              return d[d.resp1];
          });
          
        });
        
        col1.on("mouseout",function(){
          d3.select(this).classed("active", false);
          heatmapLabel.text("");
        })
      
      //col2
      var col2 = heatmap.selectAll("dis").data(data).enter().append("rect")
          .attr("x",cellWidth)
          .attr("y",function(d){
            return strata(d.stratum);
          })
          .attr("width",cellWidth)
          .attr("height",cellHeight)
          .attr("class",function(d){
            return d.stratum + " D " + d["Disagree"];
        })
          .style("fill",function(d){
            return color(d["Disagree"]);
          })
          .each(function(d){
            d.resp2 = "Disagree";
          });
          
        var heatmapLabel2 = p2.append("text").style("fill","grey").attr("font-family","Georgia");
        
        col2.on("mouseover",function(d){
          
          d3.select(this).classed("active", true);
          
          heatmapLabel2
            .attr("x",function(){
            return resp(d.resp2) + cellWidth/2 - 8;
          })
            .attr("y",function(){
              return strata(d.stratum) + cellHeight/2 + 4;
          })
            .text(function(){
              return d[d.resp2];
          });     
        });
        
        col2.on("mouseout",function(){
          d3.select(this).classed("active", false);
          heatmapLabel2.text("");
        });
        
        //col3
      var col3 = heatmap.selectAll("n").data(data).enter().append("rect")
          .attr("x",cellWidth*2)
          .attr("y",function(d){
            return strata(d.stratum);
          })
          .attr("width",cellWidth)
          .attr("height",cellHeight)
          .attr("class",function(d){
            return d.stratum + " N " + d["Neither"];
        })
          .style("fill",function(d){
            return color(d["Neither"]);
          })
          .each(function(d){
            d.resp3 = "Neither";
          });
          
        var heatmapLabel3 = p2.append("text").style("fill","grey").attr("font-family","Georgia");
        
        col3.on("mouseover",function(d){
          
          d3.select(this).classed("active", true);
          
          heatmapLabel3
            .attr("x",function(){
            return resp(d.resp3) + cellWidth/2 - 8;
          })
            .attr("y",function(){
              return strata(d.stratum) + cellHeight/2 + 4;
          })
            .text(function(){
              return d[d.resp3];
          });     
        });
        
        col3.on("mouseout",function(){
          d3.select(this).classed("active", false);
          heatmapLabel3.text("");
        });
        
        //col4
      var col4 = heatmap.selectAll("a").data(data).enter().append("rect")
          .attr("x",cellWidth*3)
          .attr("y",function(d){
            return strata(d.stratum);
          })
          .attr("width",cellWidth)
          .attr("height",cellHeight)
          .attr("class",function(d){
            return d.stratum + " A " + d["Agree"];
        })
          .style("fill",function(d){
            return color(d["Agree"]);
          })
          .each(function(d){
            d.resp4 = "Agree";
          });
          
        var heatmapLabel4 = p2.append("text").style("fill","grey").attr("font-family","Georgia");
        
        col4.on("mouseover",function(d){
          
          d3.select(this).classed("active", true);
          
          heatmapLabel4
            .attr("x",function(){
            return resp(d.resp4) + cellWidth/2 - 8;
          })
            .attr("y",function(){
              return strata(d.stratum) + cellHeight/2 + 4;
          })
            .text(function(){
              return d[d.resp4];
          });     
        });
        
        col4.on("mouseout",function(){
          d3.select(this).classed("active", false);
          heatmapLabel4.text("");
        });
        
        //col5
      var col5 = heatmap.selectAll("sa").data(data).enter().append("rect")
          .attr("x",cellWidth*4)
          .attr("y",function(d){
            return strata(d.stratum);
          })
          .attr("width",cellWidth)
          .attr("height",cellHeight)
          .attr("class",function(d){
            return d.stratum + " SA " + d["Strongly Agree"];
        })
          .style("fill",function(d){
            return color(d["Strongly Agree"]);
          })
          .each(function(d){
            d.resp5 = "Strongly Agree";
          });
          
        var heatmapLabel5 = p2.append("text").style("fill","grey").attr("font-family","Georgia");
        
        col5.on("mouseover",function(d){
          
          d3.select(this).classed("active", true);
          
          heatmapLabel5
            .attr("x",function(){
            return resp(d.resp5) + cellWidth/2 - 8;
          })
            .attr("y",function(){
              return strata(d.stratum) + cellHeight/2 + 4;
          })
            .text(function(){
              return d[d.resp5];
          });     
        });
        
        col5.on("mouseout",function(){
          d3.select(this).classed("active", false);
          heatmapLabel5.text("");
        });
      });
              
    }
    
    drawBarChart(svg);
    drawStackedBarChart(svg);
    drawPieChart(svg);
    drawHeatmap(svg);