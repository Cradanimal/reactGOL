
const columns = 70, rows = 50, box=12, speed=1000;
const width=box*columns, height=box*rows;
let run = 0;


class GameOfLife extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells : [[]],
      gen : 0,
      running : false
    }
  }


  componentWillMount() {
    this.randomPopulation();
  }

  randomPopulation(){
    let environment = [], tempArr = [];
    for(let i=0; i<rows; i++){
      for(let j=0; j<columns; j++){
        let num = Math.round(Math.random());
        tempArr.push(num);
      }
      environment.push(tempArr);
      tempArr=[];
    }
    console.log(environment);
    this.setState({ cells: environment, gen: 0 });
  }

  componentDidMount(){
    this.run();
  }

  run(){
    setInterval(function(){this.naturalSelection();}.bind(this), speed);
  }

  naturalSelection() {
    const workingEnviron = JSON.parse(JSON.stringify(this.state.cells))
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        workingEnviron[i][j] = this.checkNeighbors(j, i, workingEnviron);
      }
    }
    this.setState({ cells: workingEnviron, gen: this.state.gen++});
  }

  checkNeighbors(x, y, environment) {
    let neighbor = 0;
    //count alive neighbors
    if(y>0 && x>0 && this.state.cells[y-1][x-1]===1){neighbor++;};
    if(y>0 && this.state.cells[y-1][x]===1){neighbor++;};
    if(y>0 && x+1<columns && this.state.cells[y-1][x+1]===1){neighbor++;};//TR

    if(x>0 && this.state.cells[y][x-1]===1){neighbor++;};
    if(x+1<columns && this.state.cells[y][x+1]===1){neighbor++;};

    if(y+1<rows && x>0 && this.state.cells[y+1][x-1]===1){neighbor++;}
    if(y+1<rows && this.state.cells[y+1][x]===1){neighbor++;};
    if(y+1<rows && x+1<columns && this.state.cells[y+1][x+1]===1){neighbor++;};

    //check rules
    if (this.state.cells[y][x] === 1){//alive rules
      if (neighbor <2){
        return 0;
      }
      if (neighbor === 2 || neighbor === 3){
        return 1;
      }
      if (neighbor > 3){
        return 0;
      }
    }
    else{
      if (neighbor === 3){
        return 1;
      }
    }
  }

  render() {
    return (
      <div>
        <svg width={width} height={height}>
          {this.state.cells.map(function(row, y) {
            return row.map(function(life, x) {
              return (
                <rect key={`${x},${y}`} x={x*box} y={y*box} width={box} height={box} className={(life===1) ? 'alive':'dead'} stroke='grey' strokeWidth={.25}/>
              );
            }.bind(this))
          }.bind(this))}
        </svg>
      </div>
    );
  }
}


ReactDOM.render(<GameOfLife />, document.getElementById('app'));
