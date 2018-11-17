import { Component } from '@angular/core';

export interface Edge {
	from: number,
	to: number,
	weight: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public vertexes: number[] = [];
  public edges: Edge[] = [];

  public testEdges = [
  	{from: 1, to: 2, weight: 4},
	{from: 1, to: 8, weight: 8},
	{from: 2, to: 3, weight: 8},
	{from: 2, to: 8, weight: 10},
	{from: 3, to: 4, weight: 7},
	{from: 3, to: 6, weight: 4},
	{from: 3, to: 9, weight: 2},
	{from: 4, to: 5, weight: 9},
	{from: 4, to: 6, weight: 14},
	{from: 5, to: 6, weight: 10},
	{from: 6, to: 7, weight: 2},
	{from: 7, to: 8, weight: 1},
	{from: 7, to: 9, weight: 6},
	{from: 8, to: 9, weight: 7}
  ];

  public result: Edge[] = [];

  private counter: number = 1;

  constructor() {

  }

  addVertex() {
  	this.vertexes.push(this.counter);

  	this.counter++;
  }

  getEdges() {
    this.edges = [];
  	this.vertexes.forEach(item => {
  		for (let i = item + 1; i <= this.vertexes.length; i++) {
  			let weight = document.getElementById(`edge_${item}_to_${i}`)['value'];
  			if (weight === '0')
  				continue;
  			this.edges.push({from: item, to: i, weight: parseInt(weight)});
  		}
  	});

  	console.log(this.edges);
  }

  setTestToEdges() {
    this.vertexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  	setTimeout(() => {
	  	this.testEdges.forEach(item => {
	       document.getElementById(`edge_${item.from}_to_${item.to}`)['value'] = item.weight;
	  	});
  	}, 0);
  }

  searchSmallerTree(): void {
	let result: Edge[] = [];
	this.sortEdges();

	this.edges.forEach(item => {
		if (result.length === 0)
			result.push(item);
		
		let temp = [...result, item];
		if (this.isLoop(temp)) 
			return;
		else
			result.push(item);
	});

	console.log(result);

	
  }

  sortEdges(): void {
	this.edges.sort((item1, item2) => {
		if (item1.weight < item2.weight) return -1;
		else if (item1.weight > item2.weight) return 1;
		else return 0;
	});
  }

  isLoop(checkedEdges): boolean {
    let loop = false;
	checkedEdges.forEach((item, index) => {
  		let newEdges = checkedEdges.filter((edge, edgeIndex) => {
  			return edgeIndex !== index;
  		})

  		let resultEdges = [item];
  		if (this.searchLoop(item.from, item, newEdges, resultEdges))
  			loop = true;
  	});

  	return loop;
  }

  searchLoop(searchVertex, currentEdge, _edges, _resultEdges): boolean {
	let edge = undefined;
	let check = false;

	if (this.checkCurrentTreeOnLoop(_resultEdges))
		return true;

  	_edges.forEach((item, index) => {
  		if (item.from === currentEdge.from || item.from === currentEdge.to || item.to === currentEdge.from || item.to === currentEdge.to) {
			let tempEdges = _edges.filter((intem, _index) => _index !== index);
			let edge = item;
			_resultEdges.push(edge);
			if (this.searchLoop(searchVertex, edge, tempEdges, _resultEdges))
				check = true;
  		}
	  });
	  
	  return check;
  }

  checkCurrentTreeOnLoop(tree): boolean {
  	let loop = true;
  	tree.forEach((item, index) => {
  		let vertex = item.from;
  		if (this.searchIndexInTree(vertex, index, tree) === -1) loop = false;
  		vertex = item.to;
  		if (this.searchIndexInTree(vertex, index, tree) === -1) loop = false;
  	});

  	return loop;
  }

  searchIndexInTree(vertex, index, tree): number {
  	return tree.findIndex((v, _index) => {
		if (index === _index) return false;

		if (v.from === vertex || v.to === vertex) return true;
	})
  }
}
