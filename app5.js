const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = 'ふつう';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win||0 );
  let total = Number( req.query.total||-1 );
  let judgement = '';
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  if( num==1 ){
    if( hand=='グー' )judgement = 'あいこ';
    else if( hand=='チョキ')judgement = '負け';
    else judgement = '勝ち';
    total += 1;
  }
  else if( num==2 ){
    if( hand=='グー' )judgement = '勝ち';
    else if( hand=='チョキ')judgement = 'あいこ';
    else judgement = '負け';
    total += 1;
  }
  else{
    if( hand=='グー' )judgement = '負け';
    else if( hand=='チョキ')judgement = '勝ち';
    else judgement = 'あいこ';
    total += 1;
  }
  if( judgement=='勝ち'){
    win += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/USB", (req, res) => {
  let USB = req.query.USB;
  let connect = Number( req.query.connect||0 );
  let total = Number( req.query.total||-1 );
  let judgement = '';
  console.log( {USB, connect, total});
  const num = Math.floor( Math.random() * 2 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '逆でした';
  else cpu = '逆ではありませんでした';
  // ここに判定を入れる
  if( num==1 ){
    if( USB=='逆に挿す' )judgement = '挿せました';
    else if( USB=='そのまま挿す')judgement = '挿せませんでした';
    total += 1;
  }else{
    if( USB=='逆に挿す' )judgement = '挿せませんでした';
    else if( USB=='そのまま挿す')judgement = '挿せました';
    total += 1;
  }
  if( judgement=='挿せました'){
    connect += 1;
  }
  const display = {
    your: USB,
    cpu: cpu,
    judgement: judgement,
    connect: connect,
    total: total
  }
  res.render( 'USB', display );
});

app.get("/dice", (req, res) => {
  let dice_num = req.query.dice_num;
  let correct = Number( req.query.correct||0 );
  let nearmiss = Number( req.query.nearmiss||0 );
  let total = Number( req.query.total||-1 );
  let judgement = '';
  console.log( {dice_num, correct, nearmiss, total});
  const num = Math.floor( Math.random() * 6 + 1 );
  let cpu = num;

  // ここに勝敗の判定を入れる
  if( num==1 ){
    if( dice_num==num )judgement = 'あたり';
    else if( dice_num==num+1)judgement = 'おしい';
    else if( dice_num== 6 )judgement = 'おしい';
    else judgement = 'はずれ';
    total += 1;
  }else if( num==2 ){
    if( dice_num==num )judgement = 'あたり';
    else if( dice_num==num+1)judgement = 'おしい';
    else if( dice_num==num-1 )judgement = 'おしい';
    else judgement = 'はずれ';
    total += 1;
  }else if( num==3 ){
    if( dice_num==num )judgement = 'あたり';
    else if( dice_num==num+1)judgement = 'おしい';
    else if( dice_num==num-1 )judgement = 'おしい';
    else judgement = 'はずれ';
    total += 1;
  }else if( num==4 ){
    if( dice_num==num )judgement = 'あたり';
    else if( dice_num==num+1)judgement = 'おしい';
    else if( dice_num==num-1 )judgement = 'おしい';
    else judgement = 'はずれ';
    total += 1;
  }else if( num==5 ){
    if( dice_num==num )judgement = 'あたり';
    else if( dice_num==num+1)judgement = 'おしい';
    else if( dice_num==num-1 )judgement = 'おしい';
    else judgement = 'はずれ';
    total += 1;
  }else if( num==6 ){
    if( dice_num==num )judgement = 'あたり';
    else if( dice_num==1)judgement = 'おしい';
    else if( dice_num==num-1 )judgement = 'おしい';
    else judgement = 'はずれ';
    total += 1;
  }

  if( judgement=='あたり'){
    correct += 1;
  }else if( judgement=='おしい'){
    nearmiss += 1;
  }
  const display = {
    your: dice_num,
    cpu: cpu,
    judgement: judgement,
    correct: correct,
    nearmiss: nearmiss,
    total: total
  }
  res.render( 'dice', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
