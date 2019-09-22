function makeLinks(data) {
    let cats = {};
    let links = [];

    // find maximums per category
    data.forEach(d => {
        if (!cats[d.category_id]) {
            cats[d.category_id] = {
                id: d.category_id,
                max: d.area,
                eaten: 0,
                waste: 0
            }
        } else {
            cats[d.category_id].max = Math.max(d.area, cats[d.category_id].max)
        }
    });

    // sum up food eaten for each category
    data.forEach(d => {
        let eaten = cats[d.category_id].max - d.area;
        cats[d.category_id].eaten += eaten;
        cats[d.category_id].waste += d.area;
    });

    console.log(cats);

    // create links from each food category to "patient" and "bin"
    for (let catIdx in cats) {
        let cat = cats[catIdx];
        links.push({
            source: "C" + catIdx,
            target: "P",
            value: cat.eaten
        });
        links.push({
            source: "C" + catIdx,
            target: "B",
            value: cat.waste
        });
    }

    return links;
}

function plotGraph() {

    // those weren't reliable data due to annotations mistakes etc.
    let ignored_cats = [1, 8, 9, 10, 12, 15];

    // create nodes for each category
    let nodes = exports.masks.categories
        .filter(d => !ignored_cats.includes(d.id))
        .map(d => {
            return {
                id: "C" + d.id,
                name: d.name,
            }
        });

    // add Patient and Bin nodes
    nodes = nodes.concat([{
        id: "P",
        name: "Patient",
    }, {
        id: "B",
        name: "Bin",
    }]);

    let links = makeLinks(exports.masks.annotations
        .filter(d => !ignored_cats.includes(d.category_id)));

    // create graph
    // see https://github.com/d3/d3-sankey
    // https://observablehq.com/@d3/sankey-diagram
    const width = 800;
    const height = 400;

    // viewing modes
    let edgeColor = 'output';
    let align = ['justified'];

    // label formatter
    function format(d) {
        const f = d3.format(",.0f");
        return `${f(d)} TWh`;
    }
    // color picker
    function color(name) {
        if (name === 'Bin') return 'red';
        if (name === 'Patient') return 'green';
        return d3.scaleOrdinal(d3.schemeCategory10)(name);
    }

    // create Sankey Graph model
    const sankey = d3.sankey()
        // .nodeAlign(d3[`sankey${align[0].toUpperCase()}${align.slice(1)}`])
        .nodeWidth(15)
        .nodePadding(10)
        .nodeId(n => n.id)
        .extent([[1, 5], [width - 1, height - 5]])
        ({
            nodes: nodes,
            links: links
        });

    // create svg elements
    const svg = d3.select("#graph")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .attr("stroke", "#000")
        .selectAll("rect")
        .data(nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => color(d.name))
        .append("title")
        .text(d => `${d.name}\n${format(d.value)}`);

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

    if (edgeColor === "path") {
        const gradient = link.append("linearGradient")
            .attr("id", d => (d.uid = DOM.uid("link")).id)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => color(d.source.name));

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => color(d.target.name));
    }

    link.append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", d => edgeColor === "none" ? "#aaa"
            : edgeColor === "path" ? d.uid
                : edgeColor === "input" ? color(d.source.name)
                    : color(d.target.name))
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

    svg.append("g")
        .style("font", "10px sans-serif")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name);
}


/**
 * Fetches the frame image and associated data from files in `/data`,
 * then plots the image in given `targetElement`,
 * scaling and translating so the tray fills the viewport
 * and draws overlay based on data from JSON.
 *
 * @param targetElement the HTML host element to draw SVG in.
 * @param trayIdx index number of the tray.
 */
function drawTrayWithOverlay(targetElement, trayIdx) {

    // svg size
    const svgW = 400;
    const svgH = 300;
    // orig pic size
    const origW = 1224;
    const origH = 946;

    let imgUrl = 'data/img/' + trayIdx + '.png';
    let trayData = window['tray_' + trayIdx];

    // bounding box of tray
    let bb = trayData.bbox;

    let svg = d3.select(targetElement)
        .append("svg")
        .style('border', 'black solid')
        .attr("width", svgW)
        .attr("height", svgH);

    // transform so tray fills the SVG
    let scale = Math.min(svgW / bb.w, svgH / bb.h); // TODO correct??
    let dx = -bb.x * scale;
    let dy = -bb.y * scale;

    svg.append("image")
        .attr('width', origW * scale)
        .attr('height', origH * scale)
        .attr('x', dx)
        .attr('y', dy)
        //.attr('preserveAspectRatio', "xMinYMin slice")
        .attr("xlink:href", imgUrl);

    let pathData = trayData.items[+trayIdx].path;
    let svgPath = drawPath(svg, pathData, 'red');

    // transform the overlay to match the transformation of the image
    let transform = 'translate(' + dx + ',' + dy + ') scale(' + scale + ')';
    console.log('Transform: ' + transform);
    svgPath.attr('transform', transform)

}

