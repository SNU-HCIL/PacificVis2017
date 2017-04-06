/**
 * Created by Charles on 6/14/2015.
 * Forked and Adjusted for PacificVis by GuHyun Han on 4/6/2017
 */

const SHOW_WARNINGS = false;

function Chart(params){
    this.params = params;

    var $this = this;

    var dim = Utils.getClientDim();
    this.width = this.params.width || dim.width - this.params.chart.margin.left - this.params.chart.margin.right;
    this.height = this.params.height || dim.height - this.params.chart.margin.top - this.params.chart.margin.bottom;


    this.prepareData(function(){
        $this.init();


        //console.log("sheelagh",$this.peopleData.filter(function(d){return d.name == "Sheelagh Carpendale"})[0])

        //var layout = new Layout();
        //layout.getLayout($this.peopleData, $this.boxesData, $this.yearMin, $this.yearMax);

        $this.createSettings();
        $this.update({
            people: {
                labels: true,
                pathes: {
                    width: true,
                    color: true,
                    opacity: $this.params.pathes.opacity,
                    points: true,
                    curvature: $this.params.chart.dyFactor
                }
            }
        });
    });



    //layout.makeTests();



}

Chart.prototype.prepareData = function(callback){
    var $this = this;

    d3.csv("./data/IEEE PVIS papers 2008-2016.csv", function(papers){

        //prepare the papers
        papers = papers.filter(function(d){
            if (d["Conference"].toLowerCase() == "pacificvis"
                && ( d["Paper type: C=conference paper, T = TVCG journal paper, M=miscellaneous (Other types of publications ...)"] == "C"
                || d["Paper type: C=conference paper, T = TVCG journal paper, M=miscellaneous (Other types of publications ...)"] == "T"
                )) return true;
            else console.log("filtered out paper",d);
        }).map(function(paper){
            return {
                year: +paper.Year,
                authors: paper["Author"].split(";")
            }
        });

        console.log("papers",papers);

        d3.csv("./data/committees_matrix.csv", function(d){
            $this.boxesData = [];

            $this.yearMin = d3.min(d, function(row){return +row.year});
            $this.yearMax = d3.max(d, function(row){return +row.year});
            $this.peopleData = [];

            $this.headers = [];

            for(var r2 = 0; r2< d.length; r2++){

                (function(r){
                    var people, name, year;

                    var row = d[r];

                    name = row["name"];
                    year = +row["year"];

                    if(r==0){//the first row, to create the boxes
                        for(var key1 in row){
                            if(key1 != "affiliation" && key1 != "name" && key1 != "year" && key1 != "country" && key1 != "role"){
                                for(var y = $this.yearMin; y <= $this.yearMax; y++) {
                                    $this.boxesData.push({year: y, name: key1, nb: 0, people: []});
                                }
                                if($this.headers.indexOf(key1) == -1) $this.headers.push(key1);
                            }
                        }
                    }

                    if($this.peopleData.filter(function(d){return d.name == name}).length == 0) {
                        people = {name: name, pid: $this.peopleData.length, values: $this.headers.map(function(d,i){return 0}), roles: []};

                        //add the publications
                        people.publications = d3.range($this.yearMin, $this.yearMax+1, 1).map(function(year){
                            return {
                                year: year,
                                papers: papers.filter(function(paper){return paper.year == year && paper.authors.indexOf(name) != -1}),
                                sum: 0
                            }
                        });

                        //find the sum of publis for each year
                        for(var z in people.publications){
                            if(z == 0) people.publications[z].sum += people.publications[z].papers.length;
                            else people.publications[z].sum += people.publications[z-1].sum + people.publications[z].papers.length;
                        }


                        $this.peopleData.push(people);
                    }
                    else people = $this.peopleData.filter(function(d){return d.name == name})[0];

                    for(var key2 in row){
                        (function(key,people,year){
                            if(key != "affiliation" && key != "name" && key != "year" && key != "country" && key != "role"){
                                var value = row[key];
                                value = +value;//parse numbers
                                if(people == undefined){console.log("people undefined",key,value)}
                                //if(people.name == "Sheelagh Carpendale" && row[key] != 0) console.log(year,key,$this.headers.indexOf(key),value);
                                people.values[$this.headers.indexOf(key)] += value;
                                if(value == 1){//size of the boxes
                                    people.roles.push({year: year, role: key});
                                    var box = $this.boxesData.filter(function(box){return box.year == parseInt(row.year) && box.name == key})[0];
                                    box.nb++;
                                    box.people.push(people.pid);
                                }
                            }
                        })(key2, people, year);
                    }
                })(r2);
            }


            //remove empty boxes
            $this.boxesData = $this.boxesData.filter(function(d){return d.nb != 0});


            //Just to find the best order of boxes
            $this.boxesByName = $this.headers.map(function(d){return {name: d, years: []}});


            /*
             $this.boxesData.forEach(function(box){
             var byName = $this.boxesByName.filter(function(d){return d.name == box.name})[0];
             if(byName.years.indexOf(box.year) == -1) {
             byName.years.push(box.year);
             }
             });

             $this.boxesByName.forEach(function(name){
             name.years.sort(d3.ascending);
             });
             $this.boxesByName.sort(function(a,b){return d3.descending(a.years.length, b.years.length)});
             */

            $this.boxesByName.forEach(function(name){
                if($this.boxesData.filter(function(d){return d.name == name.name}).length == 0) console.error("empty boxName",name);
                name.maxNb = d3.max($this.boxesData.filter(function(d){return d.name == name.name}),function(d){return d.nb});
                if($this.params.rolesOrder.indexOf(name.name) == -1) console.error("no predefined order for ",name.name);
            });

            //trick for program committee in middle
            //$this.boxesByName.filter(function(d){return d.name == "Program Committee"})[0].years.splice(0,0,2005.5);

            /*
             $this.boxesByName.sort(function(a,b){
             var byYears = d3.ascending(a.years[0], b.years[0]);
             if(byYears != 0) return byYears;
             return d3.descending(a.years.length, b.years.length);
             });

             //remove tricks
             $this.boxesByName.filter(function(d){return d.name == "Program Committee"})[0].years.splice(0,1);
             */

            $this.boxesByName.sort(function(a,b){return d3.ascending($this.params.rolesOrder.indexOf(a.name),$this.params.rolesOrder.indexOf(b.name))})

            if($this.boxesByName.length != $this.params.boxColors.sides.length * 2 + 1) console.error("need "+$this.boxesByName.length+" different colors on the sides");
            $this.boxesByName.forEach(function(header, h){
                header.index = h;
                if(h == Math.floor($this.boxesByName.length/2)) {
                    header.color = $this.params.boxColors.center;
                    //console.log(h,"center");
                }
                else if(h < Math.floor($this.boxesByName.length/2)) {
                    header.color = $this.params.boxColors.sides[h];
                    //console.log(h,"before")
                }
                else {
                    //console.log(Math.floor($this.boxesByName.length/2) - (h - Math.floor($this.boxesByName.length/2)),"after");
                    header.color = $this.params.boxColors.sides[Math.floor($this.boxesByName.length/2) - (h - Math.floor($this.boxesByName.length/2))];
                }
                //console.log( header.color)
                //console.log(header.name + " : " + header.years + "; max: " +header.maxNb + ", index: "+header.index)
            });




            //Compute the first desired pos for each people, i.e. their first non-free position
            //find firstRole, lastRole, firstPublication, lastPublication
            //and derive yearStart, yearEnd from these
            $this.peopleData.forEach(function(people){
                people.roles = people.roles.sort(function(a,b){
                    if(a.year != b.year) return d3.ascending(a.year, b.year);
                    return d3.ascending($this.boxesByName.filter(function(d){return a.role == d.name})[0].index,$this.boxesByName.filter(function(d){return b.role == d.name})[0].index);
                });
                people.firstRole = people.roles[0];
                people.lastRole = people.roles[people.roles.length-1];
                people.sumRoles = d3.range($this.yearMin, $this.yearMax+1, 1).map(function(year){return {
                    year: year,
                    sum: people.roles.filter(function(role){return role.year <= year}).length
                }});

                //find the first time the sum of publis is > 0
                for(var p=0;p<people.publications.length;p++){
                    var curPub = people.publications[p];
                    if(curPub.sum > 0 && people.firstPublication == undefined) people.firstPublication = curPub;
                }

                var lastSum =  people.publications[people.publications.length-1].sum;
                for(p=people.publications.length-2;p>=0;p--){
                    curPub = people.publications[p];
                    if(curPub.sum < lastSum){
                        people.lastPublication = people.publications[p+1];
                        break;
                    }
                }

                if($this.params.layout.yearStart == "publis+roles"){
                    people.yearStart = d3.min([people.firstRole.year-1, (people.firstPublication != undefined ? people.firstPublication.year-1 : Number.MAX_VALUE)]);
                    people.yearEnd = d3.max([people.lastRole.year+1, (people.lastPublication != undefined ? people.lastPublication.year+1 : -1)]);
                }
                else if($this.params.layout.yearStart == "roles"){
                    people.yearStart = people.firstRole.year - 1;
                    people.yearEnd = people.lastRole.year + 1;
                }


                //console.log(people.roles)
            });


            //nbPeople = 226 [0-225]






            var nbPeople = $this.peopleData.length;
            var pos_margin = 3;
            var free_pos_top = d3.range(0,pos_margin,1),
                free_pos_bottom = d3.range(nbPeople-pos_margin,nbPeople,1);


            //get the maximum number of positions needed, according to people with several roles
            var nbPositions = 0;
            d3.range($this.yearMin,$this.yearMax+1,1).forEach(function(year){
                var nbPositionsThisYear = nbPeople;
                $this.peopleData.forEach(function(people){
                    var nbRolesThisYear = people.roles.filter(function(d){return d.year == year}).length;
                    if(nbRolesThisYear > 1){
                        nbPositionsThisYear += (nbRolesThisYear - 1);
                    }
                });
                if(nbPositionsThisYear > nbPositions) nbPositions = nbPositionsThisYear;
            });


            $this.xScale = d3.scale.linear().domain([$this.yearMin,$this.yearMax]).range([$this.params.years.margin.left, $this.width - $this.params.years.margin.right]);
            $this.xScaleStep = $this.xScale($this.yearMax) - $this.xScale($this.yearMax - 1);
            console.log("xscalestep",$this.xScaleStep);

            var yStartYears = $this.params.years.margin.top,
                yEndYears = yStartYears + $this.params.years.height + $this.params.years.margin.bottom;
            $this.yScalePeople = d3.scale.linear().domain([0,nbPositions]).range([yEndYears - $this.params.frame.margin.top, $this.height - $this.params.frame.margin.bottom]);
            //var maxPeopleOverall = d3.sum($this.boxesByName, function(d){return d.maxNb});
            //$this.heightScaleBoxes = d3.scale.linear().domain([0,nbPositions]).range([0, $this.height - yEndYears - $this.params.frame.margin.top - $this.params.frame.margin.bottom - $this.boxesByName.length * $this.params.boxes.margin.top]);
            //console.log(this.heightScaleBoxes(0))


            //compute the positions for each box for each year
            $this.yearPos = d3.range($this.yearMin,$this.yearMax+1,1).map(function(d){return {year: d, positions: d3.range(0,nbPositions,1).map(function(d){return {role: undefined, pid: undefined, index: d}})}});


            console.log("boxesByName",$this.boxesByName);
            console.log("boxesData",$this.boxesData);
            console.log("peopleData",$this.peopleData);
            console.log("yearPos",$this.yearPos);


            var startPos = pos_margin;
            //var curY = yEndYears;

            for(var b = 0; b < $this.boxesByName.length; b++){
                var box = $this.boxesByName[b];
                //box.y = curY + b*$this.params.boxes.margin.top;
                //box.height = $this.heightScaleBoxes(box.maxNb);
                box.startPos = startPos;
                box.endPos = startPos + box.maxNb;
                box.centerPos = parseInt((box.startPos + box.endPos) / 2);
                //console.log(box.name,curY,box.maxNb,box.height)
                startPos = box.endPos + pos_margin;//TODO
                //curY += box.height;
            }


            //compute the positions inside each box for each year
            d3.range($this.yearMin,$this.yearMax+1,1).forEach(function(year){
                for(var b = 0; b<$this.boxesByName.length;b++){
                    (function(b){
                        var boxName = $this.boxesByName[b];
                        var the_box = $this.boxesData.filter(function(d){return d.year == year && d.name == boxName.name})[0];
                        if(the_box != undefined){
                            var positions = [];
                            for(var i=0; i<the_box.nb; i++){
                                if(i%2 == 0) positions.push(boxName.centerPos + i/2);
                                else positions.push(boxName.centerPos - Math.floor(1+ i/2));
                            }
                            positions.sort(d3.ascending);
                            the_box.positions = positions;
                        }
                    })(b);
                }
            });


            //for each yearPos, compute the positions of each role and check that no overlapping positions
            $this.yearPos.forEach(function(yearPos){
                var boxes = $this.boxesData.filter(function(d){return d.year == yearPos.year});
                boxes.forEach(function(box){
                    box.positions.forEach(function(position,p){
                        if(yearPos.positions[position].pid != undefined) console.error("position"+position+"already taken for year "+yearPos.year);
                        else{
                            yearPos.positions[position].role = box.name;
                            yearPos.positions[position].pid = box.people[p];
                        }
                    });
                });
            });


            var debug = false;
            $this.peopleData.forEach(function(people){
                if(debug)console.log("people "+people.name);
                var firstPos = $this.yearPos.filter(function(d){return d.year == people.firstRole.year})[0].positions.filter(function(d){return d.pid == people.pid})[0];
                if(debug)console.log("   first pos: "+firstPos.index+"("+people.firstRole.year+")");
                if(debug)console.log("   ---Starting left before "+people.firstRole.year);
                setPosition(people,people.firstRole.year-1,firstPos,"left");
                if(debug)console.log("   ---Starting right after "+people.firstRole.year);
                setPosition(people,people.firstRole.year+1,firstPos,"right");
            });

            function setPosition(people,year,curPos,direction){
                if(year < people.yearStart || year > people.yearEnd){
                    return;
                }
                if(year < $this.yearMin || year > $this.yearMax) {
                    //if(debug)console.log("      ---RETURN year "+year);
                    return;
                }

                if(debug)console.log("      ---year "+year);

                var oldPos = curPos;
                var yPositions = $this.yearPos.filter(function(d){return d.year == year})[0].positions;

                //if already has a position, then change it for curPos
                var the_pos = yPositions.filter(function(d){return d.pid == people.pid})[0];

                if(the_pos != undefined){
                    curPos = the_pos;
                    if(debug)console.log("         has a roled pos: "+curPos.index);
                }

                //if need to change position
                else{

                    //if position is free
                    if(yPositions[curPos.index].pid == undefined){
                        yPositions[curPos.index].pid = people.pid;
                        yPositions[curPos.index].role = "free";
                        if(debug)console.log("          can keep same pos (free): "+curPos.index);
                    }

                    //if need to change position
                    else{
                        var found = false;
                        for(var i=0; i<nbPositions; i++){
                            var newPos = undefined;
                            var stop = false;
                            if(curPos.index + i < yPositions.length){//get the next pos
                                newPos = yPositions[curPos.index + i];
                                if(yPositions[newPos.index].pid == undefined){
                                    curPos = newPos;
                                    stop = true;
                                }
                            }
                            if(curPos.index - i >= 0 && !stop){//get the previous pos
                                newPos = yPositions[curPos.index - i];
                                if(yPositions[newPos.index].pid == undefined){
                                    curPos = newPos;
                                    stop = true;
                                }
                            }
                            if(stop){
                                found = true;
                                break;
                            }
                        }
                        if(found){
                            if(debug)console.log("          changed pos "+oldPos.index+"("+((direction == "left" ? (year+1) : (year-1)))+") to "+curPos.index+"("+year+")");
                            yPositions[curPos.index].pid = people.pid;
                            yPositions[curPos.index].role = "free";
                        }
                        else{
                            var freeRemaining = yPositions.filter(function(d){return d.pid == undefined});
                            console.error("         could not find a position for year "+year+", with "+freeRemaining.length+" free positions remaining : ",freeRemaining);
                        }
                    }
                }

                setPosition(people,(direction == "left") ? (year-1) : (year + 1),curPos,direction);

            }






            //Check that everyone has at least one position every year
            /*
             d3.range(0,nbPeople,1).forEach(function(pid){
             $this.yearPos.forEach(function(yearPos){
             var nb = yearPos.positions.filter(function(d){return d.pid == pid}).length;
             if(nb == 0) console.error("people with pid="+pid+" found "+nb+" times for year "+yearPos.year);
             });
             });
             */



            callback.call();
        });
    });

};


Chart.prototype.init = function() {

    var $this = this;

    this.svg = d3.select("#main").append("svg").attr({
        width: this.width,
        height:this.height
    });

    var defs = this.svg.append("defs");


    /* TODO
     this.sliderParams.barGradient.attrs.y1 = -frameDim.height/2;
     this.sliderParams.barGradient.attrs.y2 = frameDim.height/2;
     var gradientBars = defs.append("linearGradient")
     .attr(this.sliderParams.barGradient.attrs);

     this.sliderParams.barGradient.stops.forEach(function(stop){
     gradientBars.append("stop").attr({
     offset: stop.offset
     }).style({
     "stop-color": stop.color
     });
     });
     */

    this.svg.append("rect").attr({
        class: "background",
        width: this.width,
        height: this.height
    }).style({
        fill: $this.params.chart.background.fill
    });

    this.line = d3.svg.line()
        .interpolate(this.params.line.interpolate)
        .x(function(d) { return d.x})
        .y(function(d) { return d.y});


    this.createYears();
    this.createBoxes();
    this.createPeople();
};

Chart.prototype.createYears = function(){
    var $this = this;
    var yearsData = d3.range(this.yearMin,this.yearMax+1,1);
    this.yearWidth = (this.width - this.params.years.margin.right - this.params.years.margin.left) / (yearsData.length-1);

    this.years = this.svg.selectAll(".year")
        .data(yearsData)
        .enter()
        .append("g")
        .attr({
            class: "year",
            transform: function(d){return d3.translate($this.xScale(d), 0)}
        });

    this.years.append("rect")
        .attr({
            x: -this.yearWidth/2,
            y: 0,
            width: this.yearWidth,
            height: $this.height
        }).style({
            fill: function(d,i){
                return i%2 == 0 ? "#FFFFFF" : d3.rgb(245,245,245)
            }
        });

    this.years.append("text")
        .attr({
            dy: "1em"
            //y: function(d){return d}
        })
        .style({
            "font-size": "15px",
            "text-anchor": "middle"
        })
        .text(function(d){return d})
};


Chart.prototype.createBoxes = function(){
    var $this = this;

    var yMargin = ($this.yScalePeople(5)-$this.yScalePeople(4))/2;

    this.boxesData.forEach(function(box){
        box.x = $this.xScale(box.year);
        box.y = $this.yScalePeople(box.positions[0]) - yMargin;
        box.height = $this.yScalePeople(box.positions[box.positions.length-1]) - box.y + yMargin;
        //box.y = box.y + $this.boxesByName.filter(function(d){return d.name == box.name})[0].height / 2 - box.height / 2;
        box.width = Math.max(10,$this.yearWidth - 2 * $this.params.boxes.margin.left);
        box.color = $this.boxesByName.filter(function(d){return d.name == box.name})[0].color;
    });

    this.boxes = this.svg.selectAll(".box")
        .data(this.boxesData)
        .enter()
        .append("g")
        .attr({
            class: "box",
            transform: function(d){return d3.translate(d.x, d.y)}
        });

    this.boxes.append("rect")
        .attr({
            x: function(d){return - (d.width/2)},
            y: 0,
            width: function(d){return d.width},
            height: function(d){return d.height},
            rx: 10
        }).style({
            fill: function(d){return d.color},
            opacity: $this.params.boxColors.opacity
        });

    var legendData = [];
    this.boxesByName.forEach(function(boxName){legendData.push($this.boxesData.filter(function(d){return d.name == boxName.name})[0])});

    this.boxesLegend = this.svg.selectAll(".boxLegend")
        .data(legendData)
        .enter()
        .append("g")
        .attr({
            class: "boxLegend",
            transform: function(d){return d3.translate($this.width - $this.params.years.margin.left , d.y + d.height / 2)}
        });

    this.boxesLegend.append("rect")
        .attr({
            x: - $this.params.boxes.legend.width/2,
            y: -.5 * $this.params.boxes.legend.heightFactor * yMargin,
            width: $this.params.boxes.legend.width,
            height: $this.params.boxes.legend.heightFactor * yMargin,
            rx: 10
        }).style({
            fill: function(d){return d.color},
            opacity: $this.params.boxColors.opacity
        });

    this.boxesLegend.append("text")
        .attr({
            y: 0,
            dy: ".3em"
        })
        .style({
            "font-size": $this.params.boxes.legend.fontSize,
            "text-anchor": "middle"
        })
        .text(function(d){return d.name})
};


Chart.prototype.createPeople = function(){
    var $this = this;

    //creates the points for each people
    this.peopleData.forEach(function(peop,p){
        //console.log(peop)
        //matrix of points, because at each x position can have several y positions

        peop.points = $this.yearPos.filter(function(d){return d.year >= peop.yearStart && d.year <= peop.yearEnd}).map(function(yearPos){
            var x = $this.xScale(yearPos.year);
            var peopPositions = yearPos.positions.filter(function(d){return d.pid == peop.pid});
            return peopPositions.map(function(pos){return {x: x, y: $this.yScalePeople(pos.index), pos: pos.index, type: "middle", role: pos.role, year: yearPos.year}});
        });

        /*
         //the first point on the left
         var firstPt, lastPt;
         for(var i = 0; i < peop.points.length; i++){
         if(peop.points[i].length > 1) {
         firstPt = peop.points[i][0];
         break;
         }
         }
         for(i = peop.points.length-1; i>=0; i--){
         if(peop.points[i].length > 1) {
         lastPt = peop.points[i][0];
         break;
         }
         }
         */
        var firstPt = peop.points[0],
            lastPt = peop.points[peop.points.length-1];
        peop.points.splice(0,0, [{x: 0, y: firstPt.y, pos: firstPt.pos, type: "start", role: "free", year: firstPt.year}] );

        //the last point on the right
        peop.points.push([{x: $this.width - $this.params.years.margin.left, y: lastPt.y, pos: lastPt.pos, type: "end", role: "free", year:  lastPt.year}]);

        //if(p==0)console.log(peop);

        peop.labelPoints = [];
        peop.pathes = [];
        peop.points.forEach(function(curPts,year){
            if(curPts[0].year >= peop.yearStart && curPts[0].year <= peop.yearEnd) {
                peop.labelPoints = peop.labelPoints.concat(curPts);
            }


            //go forward to find paths
            var nextPts = peop.points[year+1];

            //if(p==0)console.log(nextPts);

            if(nextPts == undefined){
                if(year == peop.points.length-1){
                    //if(p==0) console.log("last year");
                    return;//stop when last year
                }
                else console.error("nextPts undefined for year "+year);
            }

            //local copy
            nextPts = nextPts.slice();

            if(curPts.length == nextPts.length){//same nb of pts
                if(curPts.length == 1){
                    peop.pathes.push({source: curPts[0], target: nextPts[0]});
                }
                else{
                    //if(curPts.length == 3)console.log(curPts,nextPts)
                    var curDone = [],
                        nextDone = [];
                    for(var c = 0; c < curPts.length; c++){//the ones with exact same role
                        var curPt = curPts[c];
                        //if(curPts.length == 3)console.log("cur",curPt)
                        for(var n = 0; n < nextPts.length; n++){
                            var nextPt = nextPts[n];
                            if(nextDone.indexOf(nextPt) != -1) continue;
                            if(curPt.role == nextPt.role){
                                peop.pathes.push({source: curPt, target: nextPt});
                                curDone.push(curPt);
                                nextDone.push(nextPt);
                                //if(curPts.length == 3)console.log("found same role",nextPt)
                                break;
                            }
                        }
                    }

                    for(c = 0; c < curPts.length; c++) {//otherwise find the closest
                        curPt = curPts[c];
                        if(curDone.indexOf(curPt) != -1) continue;
                        var closestNext = undefined;
                        for (n = 0; n < nextPts.length; n++) {
                            nextPt = nextPts[n];
                            if (nextDone.indexOf(nextPt) != -1) continue;
                            var dist = Math.abs(curPt.pos - nextPt.pos);
                            if (closestNext == undefined || dist < Math.abs(closestNext.pos - curPt.pos)) {
                                closestNext = nextPt;
                                //if (curPts.length == 3)console.log("found closest", dist, closestNext)
                            }
                        }
                        if (closestNext == undefined) {
                            console.error("could not find the closest point");
                        }
                        else {
                            peop.pathes.push({source: curPt, target: closestNext});
                            curDone.push(curPt);
                            nextDone.push(closestNext);
                        }
                    }

                }
                //if (curPts.length == 3) console.log("pathes",peop.pathes)
            }

            //MERGE
            else if(curPts.length > nextPts.length){//nb of points decreases -> merge
                //start from nextPts, and associate curPts if same role
                //for remaining curPts, merge to closest nextPt
                //console.log("merge")
                //if(curPts.length == 3)console.log(curPts,nextPts)
                curDone = [];
                nextDone = [];
                for(n = 0; n < nextPts.length; n++){//the ones with exact same role
                    nextPt = nextPts[n];
                    //if(curPts.length == 3)console.log("cur",curPt)
                    for(c = 0; c < curPts.length; c++){
                        curPt = curPts[n];
                        if(curDone.indexOf(curPt) != -1) continue;
                        if(curPt.role == nextPt.role){
                            peop.pathes.push({source: curPt, target: nextPt});
                            curDone.push(curPt);
                            nextDone.push(nextPt);
                            //if(curPts.length == 3)console.log("found same role",nextPt)
                            break;
                        }
                    }
                }

                for(n = 0; n < nextPts.length; n++) {//otherwise find the closest curPt going into nextPt
                    nextPt = nextPts[n];
                    if(nextDone.indexOf(nextPt) != -1) continue;
                    var closestCur = undefined;
                    for (c = 0; c < curPts.length; c++) {
                        curPt = curPts[c];
                        if (curDone.indexOf(curPt) != -1) continue;
                        dist = Math.abs(curPt.pos - nextPt.pos);
                        if (closestCur == undefined || dist < Math.abs(closestCur.pos - nextPt.pos)) {
                            closestCur = curPt;
                            //console.log("found closest", dist, closestCur)
                        }
                    }
                    if (closestCur == undefined) {
                        console.error("could not find the closest point");
                    }
                    else {
                        peop.pathes.push({source: closestCur, target: nextPt});
                        curDone.push(closestCur);
                        nextDone.push(nextPt);
                    }
                }

                //finally, for all curPts which dont connect, go to closest nextPt
                for(c = 0; c < curPts.length; c++) {
                    curPt = curPts[c];
                    if(curDone.indexOf(curPt) != -1) continue;
                    closestNext = undefined;
                    //console.log(curPts,nextPts);
                    for (n = 0; n < nextPts.length; n++) {
                        nextPt = nextPts[n];
                        dist = Math.abs(curPt.pos - nextPt.pos);
                        if (closestNext == undefined || dist < Math.abs(closestNext.pos - curPt.pos)) {
                            closestNext = nextPt;
                            //if (curPts.length == 3)console.log("found closest", dist, closestNext)
                        }
                    }
                    if (closestNext == undefined) {
                        console.error("could not find the closest point");
                    }
                    else {
                        peop.pathes.push({source: curPt, target: closestNext});
                        curDone.push(curPt);
                        nextDone.push(closestNext);
                    }
                }

                //check all points are connected at least once
                var orphanCur = curPts.filter(function(d){return curDone.indexOf(d) == -1});
                var orphanNext = nextPts.filter(function(d){return nextDone.indexOf(d) == -1});

                if(orphanCur.length > 0) console.error("orphan curPts",orphanCur);
                if(orphanNext.length > 0) console.error("orphan nextPts",orphanNext);

            }

            //SPLIT
            else{//nb of pts increases -> split
                //start from curPts, and associate nextPts if same role
                //for remaining nextPts, merge to closest curPt
                nextDone = [];
                curDone = [];
                for(c = 0; c < curPts.length; c++){//the ones with exact same role
                    curPt = curPts[c];
                    //if(curPts.length == 3)console.log("cur",curPt)
                    for(n = 0; n < nextPts.length; n++){
                        nextPt = nextPts[c];
                        if(nextDone.indexOf(nextPt) != -1) continue;
                        if(curPt.role == nextPt.role){
                            peop.pathes.push({source: curPt, target: nextPt});
                            nextDone.push(nextPt);
                            curDone.push(curPt);
                            //if(curPts.length == 3)console.log("found same role",curPt)
                            break;
                        }
                    }
                }

                for(c = 0; c < curPts.length; c++) {//otherwise find the closest nextPt going into curPt
                    curPt = curPts[c];
                    if(curDone.indexOf(curPt) != -1) continue;
                    closestNext = undefined;
                    for (n = 0; n < nextPts.length; n++) {
                        nextPt = nextPts[n];
                        if (nextDone.indexOf(nextPt) != -1) continue;
                        dist = Math.abs(curPt.pos - nextPt.pos);
                        if (closestNext == undefined || dist < Math.abs(closestNext.pos - curPt.pos)) {
                            closestNext = nextPt;
                            //console.log("found closest", dist, closestNext)
                        }
                    }
                    if (closestNext == undefined) {
                        console.error("could not find the closest point");
                    }
                    else {
                        peop.pathes.push({source: curPt, target: closestNext});
                        nextDone.push(closestNext);
                        curDone.push(curPt);
                    }
                }

                //finally, for all nextPts which dont connect, go to closest curPt
                for(n = 0; n < nextPts.length; n++) {
                    nextPt = nextPts[n];
                    if(nextDone.indexOf(nextPt) != -1) continue;
                    closestCur = undefined;
                    for (c = 0; c < curPts.length; c++) {
                        curPt = curPts[c];
                        dist = Math.abs(curPt.pos - nextPt.pos);
                        if (closestCur == undefined || dist < Math.abs(closestCur.pos - nextPt.pos)) {
                            closestCur = curPt;
                            //if (curPts.length == 3)console.log("found closest", dist, closestCur2)
                        }
                    }
                    if (closestCur == undefined) {
                        console.error("could not find the closest point");
                    }
                    else {
                        peop.pathes.push({source: closestCur, target: nextPt});
                        nextDone.push(nextPt);
                        curDone.push(closestCur);
                    }
                }

                //check all points are connected at least once
                orphanNext = nextPts.filter(function(d){return nextDone.indexOf(d) == -1});
                orphanCur = curPts.filter(function(d){return curDone.indexOf(d) == -1});

                if(orphanNext.length > 0) console.error("orphan curPts",orphanNext);
                if(orphanCur.length > 0) console.error("orphan curPts",orphanCur);
            }


        });

        //if(peop.name.indexOf("Rensink") != -1) console.log(peop)
        //keep only pathes that exist
        peop.pathes = peop.pathes.filter(function(d){
            return d.source.year >= peop.yearStart && d.target.year <= peop.yearEnd
        });

    });

    var find_connections = false;
    if(find_connections) {
        var connections = $this.boxesByName.map(function (d) {
            return {name: d.name, connections: []}
        });

        //console.log(connections)

        //finds the connectivity between roles
        $this.peopleData.forEach(function (peop) {
            peop.pathes.forEach(function (path) {
                if (path.source.role == path.target.role || path.source.role == "free" || path.target.role == "free") return;
                var sourceConnections = connections.filter(function (d) {
                        return d.name == path.source.role
                    })[0].connections,
                    targetConnections = connections.filter(function (d) {
                        return d.name == path.target.role
                    })[0].connections;
                var sourceConnection = sourceConnections.filter(function (d) {
                    return d.name == path.target.role
                })[0];
                if (sourceConnection == undefined) sourceConnections.push({name: path.target.role, nb: 1});
                else sourceConnection.nb++;
                var targetConnection = targetConnections.filter(function (d) {
                    return d.name == path.source.role
                })[0];
                if (targetConnection == undefined) targetConnections.push({name: path.source.role, nb: 1});
                else targetConnection.nb++;
            });
        });

        connections.forEach(function (connection) {
            connection.connections.sort(function (a, b) {
                return d3.descending(a.nb, b.nb)
            });
        });
        connections.sort(function (a, b) {
            return d3.descending(a.connections[0].nb, b.connections[0].nb);
        });

        //console.log("connections", connections);
        connections.forEach(function (connection) {
            console.log(connection.name);
            if(["Steering Committee","Program Committee","Best Paper Committee","Papers Chair","Tutorials Chair","Doctoral Colloquium Chair","Conference Chair","Posters Chair","Panels Chair","Publicity Chair","Workshops Chair","Exhibits Chair"].indexOf(connection.name) != -1) return;
            connection.connections.filter(function (d) {
                //return d.nb > 2 && d.nb <= 5
                return true;
            }).forEach(function (c) {
                console.log("   " + c.name + " : " + c.nb);
            })
        });
    }


    this.people = this.svg.selectAll(".people")
        .data(this.peopleData)
        .enter()
        .append("g")
        .attr({
            class: "people"
        });

    var minMaxRoles = [
        d3.min($this.peopleData, function(d){return d3.max(d.sumRoles.map(function(d){return d.sum}))}),
        d3.max($this.peopleData, function(d){return d3.max(d.sumRoles.map(function(d){return d.sum}))})
    ];

    var minMaxSumPublis = [
        d3.min($this.peopleData, function(d){return d3.min(d.publications.map(function(d2){return d2.sum}))}),
        d3.max($this.peopleData, function(d){return d3.max(d.publications.map(function(d2){return d2.sum}))})
    ];

    console.log(minMaxRoles,minMaxSumPublis)

    var fontSizeScale = d3.scale.linear().domain(minMaxRoles).range($this.params.scales.fontSizeRange);
    var fontWeightScale = d3.scale.linear().domain(minMaxRoles).range($this.params.scales.fontWeightRange);
    var strokeWidthScale = d3.scale.linear().domain(minMaxSumPublis).range($this.params.scales.strokeWidthRange);

    this.fontSizeScale = fontSizeScale;
    this.fontWeightScale = fontWeightScale;
    this.strokeWidthScale = strokeWidthScale;

    this.people.each(function(peop){

        peop.textDims = [];

        var labels = d3.select(this).selectAll(".label").data(peop.labelPoints).enter().append("text")
            .attr({
                x: function(d){return d.x},
                dy: ".3em",
                y: function(d){return d.y},
                class: function(d){
                    d.sumRoles = peop.sumRoles.filter(function(d2){return d2.year == d.year})[0].sum;
                    return "label";
                }
            })

            .style({
                "font-family": "Alegreya Sans",
                "font-size": function(pt){
                    //pt.sumRoles = peop.sumRoles.filter(function(d){return d.year == pt.year})[0].sum;
                    return fontSizeScale(pt.sumRoles);
                },
                "font-weight": function(pt){
                    //var sumRoles = peop.sumRoles.filter(function(d){return d.year == pt.year})[0].sum;
                    return 100*Math.floor(fontWeightScale(pt.sumRoles)/100);
                },
                "text-anchor": function(d){return d.type}
            })
            .text(peop.name);

        labels.each(function(d){
            var bbox = d3.select(this).node().getBBox();
            peop.textDims.push({year: d.year, width: bbox.width, height: bbox.height});
        });

        peop.pathes.forEach(function(path) {
            //the path stroke width
            path.sumPublis = peop.publications.filter(function (d) {
                return d.year == path.target.year
            })[0].sum;
        });

        d3.select(this).selectAll(".pathes").data(peop.pathes).enter().insert("path",".back")
            .attr("class","pathes").style("fill","none");
    });


    this.people.on("mouseenter", function(d){
        d.over = true;
        updateStyle(d3.select(this),d);
    }).on("mouseleave", function(d){
        d.over = false;
        updateStyle(d3.select(this),d);
    }).on("click", function(d){
        if(d.select == undefined) d.select = true;
        else d.select = !d.select;
        updateStyle(d3.select(this),d);
    });

    function updateStyle(elem, data){

        var style = getStyle(data);

        elem.style("cursor", style.cursor);

        elem.selectAll(".label")
            .style(style.label);

        if(style.pathes)
        elem.selectAll(".pathes")
            .style(style.pathes);

        else
        elem.selectAll(".pathes").style("stroke", function(d){return d.strokeColor})


        function getStyle(data){
            if(data.select){
                return {
                    label: {
                        fill: d3.rgb(207,68,93)
                    },
                    pathes: {
                        stroke: d3.rgb(207,68,93)
                    },
                    cursor: "pointer"
                };
            }
            else if(data.over){
                return {
                    label: {
                        fill: d3.rgb(22,134,204)
                    },
                    pathes: {
                        stroke: d3.rgb(22,134,204)
                    },
                    cursor: "pointer"
                };
            }
            else{
                return {
                    label: {
                        fill: "black"
                    },
                    cursor: "default"
                };
            }
        }

    }


};


Chart.prototype.createSettings = function(){

    var $this = this;


    var settings = d3.select("#main").insert("div","svg")
        .attr("id","settings")
        .style("margin-bottom","10px");



    var slidersData = [
        {
            name: "Curvature",
            id: "slider-curv",
            min: 0.01,
            max: 1,
            value: $this.params.chart.dyFactor,
            step: 0.01,
            range: false
        },
        {
            name: "opcaity",
            id: "slider-opacity",
            min: 1,
            max: 100,
            step: 1,
            value: $this.params.pathes.opacity,
            range: false
        },
        {
            name: "Stroke Width",
            id: "slider-stroke-width",
            min: 0.1,
            max: 20,
            step: 0.05,
            range: true,
            values: $this.params.scales.strokeWidthRange
        },
        {
            name: "Font Size",
            id: "slider-font-size",
            min: 0.1,
            max: 50,
            step: 0.05,
            range: true,
            values: $this.params.scales.fontSizeRange
        },
        {
            name: "Font Weight",
            id: "slider-font-weight",
            min: 100,
            max: 999,
            step: 100,
            range: true,
            values: $this.params.scales.fontWeightRange
        }
    ];


    var setting = settings.selectAll(".setting").data(slidersData)
        .enter().append("div").attr("class","setting")
        .attr("id",function(d){return "setting-"+ d.id})
        .style({
            display: "inline-block",
            "margin-right": "30px",
            "margin-left": "10px"
        });

    setting.append("label").text(function(d){return d.name});
    setting.append("div")
        .attr("id",function(d){return d.id})
        .style({
            display: "block"
            //"margin-left": "10px"
        });

    $this.linksCurvature = $this.params.chart.dyFactor;

    slidersData.forEach(function(sliderData){
        $("#"+sliderData.id).slider({
            min: sliderData.min,
            max: sliderData.max,
            value: sliderData.value,
            values: sliderData.values,
            range: sliderData.range,
            step: sliderData.step,
            //create: function(event,slider){setSlider(event,slider,sliderData)},
            change: function(event,slider){setSlider(event,slider,sliderData)},
            slide: function(event,slider){setSlider(event,slider,sliderData)}
        });

        if(sliderData.range){
            d3.select("#setting-"+sliderData.id).select("label").text(sliderData.name+": "+$( "#"+sliderData.id ).slider( "values", 0 )+"-"+$( "#"+sliderData.id ).slider( "values", 1 ));
        }
        else{
            d3.select("#setting-"+sliderData.id).select("label").text(sliderData.name+": "+$( "#"+sliderData.id ).slider( "value"));
        }

    });
    function setSlider(event, slider, data){

        var min = $("#"+data.id).slider("option","min"),
            max = $("#"+data.id).slider("option","max");

        if(data.range){
            var minVal = slider.values[0],
                maxVal = slider.values[1];
            d3.select("#setting-"+data.id).select("label").text(data.name+": "+minVal+"-"+maxVal);
        }
        else{
            var value = slider.value || data.value;
            d3.select("#setting-"+data.id).select("label").text(data.name+": "+value);
        }

        switch(data.id){
            case "slider-curv":
                $this.linksCurvature = value;
                $this.update({people: {pathes: {points: true}}});
                break;
            case "slider-opacity":
                $this.update({people: {pathes: {opacity: value}}});
                break;
            case "slider-stroke-width":
                $this.strokeWidthScale.range([minVal,maxVal]);
                $this.update({people: {pathes: {width: true}}});
                break;
            case "slider-font-size":
                $this.fontSizeScale.range([minVal,maxVal]);
                $this.update({people: {labels: true, pathes: {points: true}}});
                break;
            case "slider-font-weight":
                $this.fontWeightScale.range([minVal,maxVal]);
                $this.update({people: {labels: true, pathes: {points: true}}});
                break;
            default:
                console.error("unknown action ",data.id);
        }
    }




};


Chart.prototype.update = function(params){
    var $this = this;



    if(params.people) {
        this.people.each(function (peop) {


            //people labels
            if (params.people && params.people.labels) {
                var labels = d3.select(this).selectAll(".label");

                labels.attr({
                    x: function (d) {
                        return d.x
                    },
                    dy: ".3em",
                    y: function (d) {
                        return d.y
                    }
                })
                    .style({
                        "font-family": "Alegreya Sans",
                        "font-size": function (pt) {
                            return $this.fontSizeScale(pt.sumRoles);
                        },
                        "font-weight": function (pt) {
                            return 100 * Math.floor($this.fontWeightScale(pt.sumRoles) / 100);
                        },
                        "text-anchor": function (d) {
                            return d.type
                        }
                    });


                labels.each(function (d) {
                    var bbox = d3.select(this).node().getBBox();
                    peop.textDims.push({year: d.year, width: bbox.width, height: bbox.height});
                });

            }


            if (params.people && params.people.pathes) {

                if(params.people.pathes.opacity != undefined){
                    var opacity = params.people.pathes.opacity;
                }

                var dy = $this.linksCurvature*$this.yearWidth;//the default dy if text is centered

                peop.pathes.forEach(function(path){

                    //the path stroke width
                    if(params.people.pathes.width){
                        path.strokeWidth = $this.strokeWidthScale(path.sumPublis);
                    }

                    //the path stroke color
                    if(params.people.pathes.color){
                        //if from free to any role, blue
                        if(path.source.role == "free" && path.target.role != "free") path.strokeColor = $this.params.pathes.color.freeToRole;
                        //if from any role to free, red
                        else if(path.source.role != "free" && path.target.role == "free") path.strokeColor = $this.params.pathes.color.roleToFree;
                        //if from role to role or free to free, black
                        else if(path.source.role == "free" && path.target.role == "free") path.strokeColor = $this.params.pathes.color.freeToFree;

                        else if(path.source.role != "free" && path.target.role != "free") path.strokeColor = $this.params.pathes.color.roleToRole;
                        else console.error(path);
                    }

                    //the path coordinates
                    if(params.people.pathes.points){
                        var x1,x2,x3,x4,y1,y2,y3,y4;
                        y1 = path.source.y;
                        y2 = path.source.y;
                        y3 = path.target.y;
                        y4 = path.target.y;

                        var textDimSource = peop.textDims.filter(function(d){return d.year == path.source.year})[0],
                            textDimTarget = peop.textDims.filter(function(d){return d.year == path.target.year})[0];

                        var dxSource = Math.max($this.params.pathes.dyMin, dy - textDimSource.width),
                            dxTarget = Math.max($this.params.pathes.dyMin, dy - textDimTarget.width);


                        switch(path.source.type){
                            case "start":
                                x1 = path.source.x + textDimSource.width;
                                x2 = x1 + dxSource;
                                break;
                            case "end":
                                console.error("source cannot be of type end");
                                break;
                            default://middle
                                x1 = path.source.x + textDimSource.width/2;
                                x2 = x1 + dxSource;
                        }
                        switch(path.target.type){
                            case "start":
                                console.error("target cannot be of type start");
                                break;
                            case "end":
                                x4 = path.target.x - textDimTarget.width;
                                x3 = x4 - dxTarget;
                                break;
                            default://middle
                                x4 = path.target.x - textDimTarget.width/2;
                                x3 = x4 - dxTarget;

                        }
                        path.coords = [{x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}];
                    }
                });

                d3.select(this).selectAll(".pathes").each(function(){
                    if(params.people.pathes.width){
                        d3.select(this).style("stroke-width", function(d){return d.strokeWidth});
                    }

                    if(params.people.pathes.color){
                        d3.select(this).style("stroke", function(d){return d.strokeColor});
                    }

                    if(params.people.pathes.opacity){
                        d3.select(this).style("opacity", opacity/100);
                    }

                    if(params.people.pathes.points){
                        d3.select(this).attr("d", function(d){return $this.line(d.coords)});
                    }

                })


            }


        });
    }

};














