// JavaScript source code
$(function() {
  const list1 = { val: ["a", "b", "c", "d", "e"] };
  const list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const height = 500;
  const width = 500;
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //�l�p
  svg
    .append("g")
    .selectAll("rect")
    .data(list2)
    .enter()
    .append("rect")
    .attr("class", "dragTest")
    .attr("height", 20)
    .attr("width", 20)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("x", d => {
      return 20 + d * 30;
    })
    .attr("y", 50);

  //6�ڈȍ~�̊p���ۂ�����
  svg
    .selectAll("rect")
    .filter((d, i) => i >= 5)
    .attr("rx", 5)
    .attr("rotate", 20);

  //��
  svg
    .append("g")
    .selectAll("circle")
    .data(list2)
    .enter()
    .append("circle")
    .attr("class", "dragTest")
    .attr("fill", "blue")
    .attr("stroke", "green")
    .attr("r", d => {
      return d * 2;
    })
    .attr("cx", d => {
      return 20 + d * 30;
    })
    .attr("cy", 100);

  //�ȉ~
  svg
    .append("g")
    .selectAll("ellipse")
    .data(list2)
    .enter()
    .append("ellipse")
    .attr("class", "dragTest")
    .attr("fill", "skyblue")
    .attr("stroke", "purple")
    .attr("cx", d => {
      return 20 + d * 30;
    })
    .attr("cy", 150)
    .transition()
    .duration(500)
    .attr("rx", d => {
      return d;
    })
    .attr("ry", d => {
      return d * 2;
    });

  //����
  svg
    .append("g")
    .selectAll("line")
    .data(list2)
    .enter()
    .append("line")
    .attr("class", "dragTest")
    .attr("x1", d => {
      return 20 + d * 30;
    })
    .attr("y1", 180)
    .attr("x2", d => {
      return 40 + d * 30;
    })
    .attr("y2", 200)
    .attr("stroke", "darkgray")
    .attr("stroke-width", d => d);

  //�܂���̍��W�w��֐�
  const line = d3
    .line()
    .x(d => {
      return 20 + d * 30;
    })
    .y(d => {
      return 250 - Math.floor(Math.random() * 11) * 3;
    });

  //�܂��
  svg
    .append("g")
    .append("path")
    .datum(list2)
    .attr("class", "dragTest")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("d", d => line(d));

  //���łȂ�
  const list3 = ["a", "b", "c"];

  const joinedByPath = svg.append("g").attr("class", "joinedGroup");

  joinedByPath
    .selectAll("rect")
    .data(list3)
    .enter()
    .append("rect")
    .attr("class", "joinedByPath")
    .attr("height", 20)
    .attr("width", 20)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("value", d => d)
    .attr("x", (d, i) => {
      return 20 + i * 30;
    })
    .attr("y", 260);

  const renderPath = () => {
    joinedByPath
      .selectAll(".pathOfJoinedByPath")
      .data(list3)
      .enter()
      .filter((d, i) => i >= 1)
      .append("line")
      .attr("class", "pathOfJoinedByPath")
      .attr("stroke", "black")
      .attr("value", d => d)
      .attr("x1", (d, i) => {
        return 20 + i * 30 + 20;
      })
      .attr("y1", 270)
      .attr("x2", (d, i) => {
        return 20 + (i + 1) * 30;
      })
      .attr("y2", 270);
  };

  renderPath();

  //�h���b�O�X�^�[�g���ɌĂяo�����֐�
  function dragstarted() {
    console.log(this);
    //�N���X�̒ǉ�
    d3.select(this)
      .raise()
      .classed("active", true);
  }

  //�l�p�h���b�O���ɌĂяo�����֐�
  function rectDragged(d) {
    d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
  }

  //�~�h���b�O���ɌĂяo�����֐�
  function circleDragged() {
    d3.select(this)
      .transition()
      .duration(100)
      .ease(d3.easeLinear)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
  }

  let tip;
  //���h���b�O�X�^�[�g���ɌĂяo�����֐�
  function lineDragstarted() {
    const absx1 = Math.abs(this.getAttribute("x1") - d3.event.x);
    const absx2 = Math.abs(this.getAttribute("x2") - d3.event.x);
    if (absx1 <= absx2) {
      tip = 1;
    } else {
      tip = 2;
    }
  }
  //���h���b�O���ɌĂяo�����֐�
  function lineDragged() {
    if (tip === 1) {
      d3.select(this)
        .attr("x1", d3.event.x)
        .attr("y1", d3.event.y);
    } else if (tip === 2) {
      d3.select(this)
        .attr("x2", d3.event.x)
        .attr("y2", d3.event.y);
    }
  }

  //�h���b�O�I�����ɌĂяo�����֐�
  function dragended() {
    //�N���X�̍폜
    d3.select(this).classed("active", false);
    console.log(this);
  }

  //�h���b�O���̃C�x���g�o�^
  d3.selectAll("rect").call(
    d3
      .drag()
      //   .on("start", dragstarted)
      .on("start", (data, i, nodes) => dragstarted2(data, i, nodes))
      .on("drag", rectDragged)
      .on("end", dragended)
  );

  d3.selectAll("circle").call(
    d3
      .drag()
      .on("start", dragstarted)
      .on("drag", circleDragged)
      .on("end", dragended)
  );

  d3.selectAll("ellipse").call(
    d3
      .drag()
      .on("start", dragstarted)
      .on("drag", circleDragged)
      .on("end", dragended)
  );

  d3.selectAll("line").call(
    d3
      .drag()
      .on("start", lineDragstarted)
      .on("drag", lineDragged)
      .on("end", dragended)
  );

  const dragging = (data, i, nodes) => {
    const elm = nodes[i];
    d3.select(elm)
      .style("left", elm.getBoundingClientRect().left + d3.event.dx + "px")
      .style("top", elm.getBoundingClientRect().top + d3.event.dy + "px");
  };

  const dragableDialog = $("#dragableDialog");
  d3.selectAll(dragableDialog).call(
    d3
      .drag()
      .on("drag", (data, i, nodes) => dragging(data, i, nodes))
  );
});
