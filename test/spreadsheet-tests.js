//QUnit.module( 'spreadsheet', QUnit.newMwEnvironment() );

var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

test( "Get column A-Z", function() {
    for (var i = 0; i < chars.length; i++) {
        equal(Spreadsheet.getColumnNameByIndex(i),chars[i],"Found "+chars[i]);
    }
});

test( "Get column AA-AZ", function() {
    for (var i = chars.length; i < chars.length*2; i++) {
        equal(Spreadsheet.getColumnNameByIndex(i),'A'+chars[i%chars.length],'Found A'+chars[i%chars.length]);
    }
});

test( "Get column BA-BZ", function() {
    for (var i = chars.length*2; i < chars.length*3; i++) {
        equal(Spreadsheet.getColumnNameByIndex(i),'B'+chars[i%chars.length],'Found B'+chars[i%chars.length]);
    }
});

test( "Get column AAA-AAZ", function() {
    for (var i = chars.length*(chars.length+1); i < chars.length*(chars.length+2); i++) {
        equal(Spreadsheet.getColumnNameByIndex(i),'AA'+chars[i%chars.length],'Found AA'+chars[i%chars.length]);
    }
});

test( "Get column BAA-BAZ", function() {
    for (var i = chars.length*(chars.length*2+1); i < chars.length*(chars.length*2+2); i++) {
        equal(Spreadsheet.getColumnNameByIndex(i),'BA'+chars[i%chars.length],'Found BA'+chars[i%chars.length]);
    }
});

test( "Get column by index A-Z", function() {
    for (var i = 0; i < chars.length; i++) {
        var name = Spreadsheet.getColumnNameByIndex(i);
        var index = Spreadsheet.getColumnIndexByName(name);
        equal(index,i+1);
    }
});

test( "Get column by index AA-AZ", function() {
    for (var i = chars.length; i < chars.length*2; i++) {
        var name = Spreadsheet.getColumnNameByIndex(i);
        var index = Spreadsheet.getColumnIndexByName(name);
        equal(index,i+1);
    }
});

test( "Get column by index BA-BZ", function() {
    for (var i = chars.length*2; i < chars.length*3; i++) {
        var name = Spreadsheet.getColumnNameByIndex(i);
        var index = Spreadsheet.getColumnIndexByName(name);
        equal(index,i+1);
    }
});

test( "Get column by index AAA-AAZ", function() {
    for (var i = chars.length*(chars.length+1); i < chars.length*(chars.length+2); i++) {
        var name = Spreadsheet.getColumnNameByIndex(i);
        var index = Spreadsheet.getColumnIndexByName(name);
        equal(index,i+1);
    }
});

test( "Get column by index BAA-BAZ", function() {
    for (var i = chars.length*(chars.length*2+1); i < chars.length*(chars.length*2+2); i++) {
        var name = Spreadsheet.getColumnNameByIndex(i);
        var index = Spreadsheet.getColumnIndexByName(name);
        equal(index,i+1);
    }
});

test( "Parse position A1", function(){
    var p = Spreadsheet.parsePosition("A1");
    equal(p.sheet, null);
    deepEqual(p.toString(), "A1");
    deepEqual(p.col, "A");
    deepEqual(p.row, 1);
});

test( "Parse position $A$1", function(){
    var p = Spreadsheet.parsePosition("$A$1");
    equal(p.sheet, null);
    deepEqual(p.toString(), "A1");
    deepEqual(p.col, "A");
    deepEqual(p.row, 1);
});

test( "Parse position $AB$10", function(){
    var p = Spreadsheet.parsePosition("$AB$10");
    equal(p.sheet, null);
    deepEqual(p.toString(),"AB10");
    deepEqual(p.col,"AB");
    deepEqual(p.row, 10);
});

test( "Parse position AB10", function(){
    var p = Spreadsheet.parsePosition("AB10");
    equal(p.sheet, null);
    deepEqual(p.toString(), "AB10");
    deepEqual(p.col, "AB");
    deepEqual(p.row, 10);
});

test( "Parse position Sheet!A1", function(){
    var p = Spreadsheet.parsePosition("Sheet!A1");
    equal(p.sheet, "Sheet");
    deepEqual(p.toString(), "A1");
    deepEqual(p.col, "A");
    deepEqual(p.row, 1);
});

test( "Parse position Sheet!A1", function(){
    var p = Spreadsheet.parsePosition("Sheet!A1");
    equal(p.sheet, "Sheet");
    deepEqual(p.toString(), "A1");
    deepEqual(p.col, "A");
    deepEqual(p.row, 1);
});

test( "Parse position Sheet!A1:B2", function(){
    var p = Spreadsheet.parsePosition("Sheet!A1:B2");
    equal(p.from.sheet, "Sheet");
    equal(p.to.sheet, "Sheet");
    deepEqual(p.from.toString(), "A1");
    deepEqual(p.from.col, "A");
    deepEqual(p.from.row, 1);
    deepEqual(p.to.toString(), "B2");
    deepEqual(p.to.col, "B");
    deepEqual(p.to.row, 2);
});

test( "Parse position !A1:B2", function(){
    var p = Spreadsheet.parsePosition("!A1:B2");
    equal(p.from.sheet,null);
    equal(p.to.sheet, null);
    deepEqual(p.from.toString(), "A1");
    deepEqual(p.from.col, "A");
    deepEqual(p.from.row, 1);
    deepEqual(p.to.toString(), "B2");
    deepEqual(p.to.col, "B");
    deepEqual(p.to.row, 2);
});

test( "Parse position A1:B2", function(){
    var p = Spreadsheet.parsePosition("A1:B2");
    equal(p.from.sheet,null);
    equal(p.to.sheet, null);
    deepEqual(p.from.toString(), "A1");
    deepEqual(p.from.col, "A");
    deepEqual(p.from.row, 1);
    deepEqual(p.to.toString(), "B2");
    deepEqual(p.to.col, "B");
    deepEqual(p.to.row, 2);
});


test( "Set cell data", function() {
    var sheet = Spreadsheet.createSheet();
    sheet.setCellData("A1","Test");
    var cell = sheet.getCell("A1");
    equal(cell.value,"Test");
});

test( "Get cell by string", function(){
    var sheet = Spreadsheet.createSheet();
    sheet.setCellData('A1',1)
    var cell = sheet.getCell('A1');
    notEqual(cell,undefined);
    notEqual(cell,null);
    equal(cell.position.col,'A');
    equal(cell.position.row,1);

});


test( "Get cell by Position", function(){
    var sheet = Spreadsheet.createSheet();
    sheet.setCellData('A1',1)
    var pos = Spreadsheet.parsePosition('A1');
    var cell = sheet.getCell(pos);
    notEqual(cell,undefined);
    notEqual(cell,null);
    equal(cell.position.col,pos.col);
    equal(cell.position.row,pos.row);
});

test( "Get cell range", function(){
    var sheet = Spreadsheet.createSheet();
    sheet.setData({
        A1:1,
        B1:2
    });
    var cells = sheet.getCellRange('A1:B1');
    deepEqual(cells,[
        [sheet.getCell('A1'),sheet.getCell('B1')]
    ]);
});


test( "Get cell range A1-C3", function(){
    var sheet = Spreadsheet.createSheet();
    var $fixture = $( "#qunit-fixture" );
    var cells = sheet.getCellRange('A1:C3');
    deepEqual(cells,[
        [sheet.getCell('A1'),sheet.getCell('B1'),sheet.getCell('C1')],
        [sheet.getCell('A2'),sheet.getCell('B2'),sheet.getCell('C2')],
        [sheet.getCell('A3'),sheet.getCell('B3'),sheet.getCell('C3')]
    ]);
});

test( "Get cell range by PositionRange", function(){
    var sheet = Spreadsheet.createSheet();
    var $fixture = $( "#qunit-fixture" );
    var range = Spreadsheet.parsePosition('A1:B1');
    var cells = sheet.getCellRange(range);
    deepEqual(cells,[
        [sheet.getCell('A1'),sheet.getCell('B1')]
    ]);
});


test( "Get cell range A1-C3 by PositionRange", function(){
    var sheet = Spreadsheet.createSheet();
    var $fixture = $( "#qunit-fixture" );
    var range = Spreadsheet.parsePosition('A1:C3');
    var cells = sheet.getCellRange(range);
    deepEqual(cells,[
        [sheet.getCell('A1'),sheet.getCell('B1'),sheet.getCell('C1')],
        [sheet.getCell('A2'),sheet.getCell('B2'),sheet.getCell('C2')],
        [sheet.getCell('A3'),sheet.getCell('B3'),sheet.getCell('C3')]
    ]);
});

test( "Value change listener test", function(){
    var sheet = Spreadsheet.createSheet();
    sheet.setCellData('A1','test');
    var cell = sheet.getCell('A1');
    var valueChanged = false;
    cell.addValueChangeListener(function(event){
        valueChanged = true;
        equal(this, cell);
        equal(event.from, 'test');
        equal(event.to, 'testVal');
    });
    cell.setValue('testVal');
    equal(valueChanged,true);
});