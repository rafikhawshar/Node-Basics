
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  

  text = text.trim().replace('\n', ''); // Modify the text variable to remove the endline and additional space

  if (text === 'quit' || text === 'exit') {
    quit();
  }
  else if(text === 'help'){
    help();
  }
  else if(text.startsWith('check')) {
    const index = text.split(' ')[1];
    checkTask(index);
  }
  else if(text.startsWith('uncheck')) {
    const index = text.split(' ')[1];
    uncheckTask(index);
  }
  else if (text === 'list\n') {
    list();
  }
  else if(text.startsWith('hello')) {
    const args = text.split(' ').slice(1).join(' '); // Extract argument
    hello(args);
  }
  else if(text === 'list') {
    listTasks();
  }
  else if(text.startsWith('add')) {
    const task = text.split(' ').slice(1).join(' ');
    addTask(task);
  }
  else if(text.startsWith('remove')) {
    const index = text.split(' ')[1]; 
    removeTask(index);}
    else if(text.startsWith('edit')) {
      const parts = text.split(' ').slice(1); // Extract the parts after 'edit'
      const index = isNaN(Number(parts[0])) ? null : Number(parts[0]);
      const newText = isNaN(Number(parts[0])) ? parts.join(' ') : parts.slice(1).join(' ');
      editTask(index, newText);
    }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(args){
  if (args) {
    console.log(`Hello ${args}!`);
  } else {
    console.log('Hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
function listTasks() {
  if (tasks.length === 0) {
    console.log("There aren't any tasks.");
  } else {
    for (let i = 0; i < tasks.length; i++) {
      const mark = tasks[i].done ? "[✓]" : "[ ]";
      console.log(`${i + 1}. ${mark} ${tasks[i].description}`);
    }
  }
}
function checkTask(index) {
  if (!index) {
    console.log("Error: No task Number!!!!!");
    return;
  }

  index = Number(index) - 1;

  if (index >= 0 && index < tasks.length) {
    tasks[index].done = true;
    console.log(`Checked task: "${tasks[index].description}"`);
  } else {
    console.log("Error: the task number is invaild!");
  }
}


function uncheckTask(index) {
  if (!index) {
    console.log("Error: No Task Number!!!");
    return;
  }

  index = Number(index) - 1;

  if (index >= 0 && index < tasks.length) {
    tasks[index].done = false;
    console.log(`Unchecked task: "${tasks[index].description}"`);
  } else {
    console.log("Error:the task number is invaild!");
  }
}
function addTask(task) {
  if (task === "") {
    console.log("Error: You should Enter a task.");
  } else {
    tasks.push({ description: task, done: false });
    console.log(`Added task: "${task}"`);
  }
}
// the help function show all the commands in the app 
function help(){
  console.log('List of commands:');
  console.log('  hello [optional_argument] - Says "Hello" or "Hello [argument]!" if an argument is provided');
  console.log('  quit - Exits the application');
  console.log('  exit - Exits the application');
  console.log('  help - Shows the list of commands');
  console.log('  list - Lists all tasks with task numbers');
  console.log('  add [task_description] - Adds a new task');
  console.log('  remove [task_number] - Removes a task by its number or the last task if no number is provided'); 
  console.log('  edit [number] [new_text] - Edits a task');
  console.log('  check [number]    - Marks a task as done');
  console.log('  uncheck [number]  - Marks a task as not done');

}
const fs = require('fs');
const tasks = loadingData('database.json'); 
function list(){
  console.log('The Tasks Are:') ;
  tasks.forEach((tasks , index) => {
    console.log(`${index + 1}: ${tasks}`)
  });
}

function removeTask(index){
  if(tasks.length === 0) {
    console.log("No tasks to remove.");
    return;
  }

  if (!index) {
    tasks.pop();
    console.log("Removed the last task.");
  } else {
    index = Number(index) - 1;
    if (index >= 0 && index < tasks.length) {
      const removed = tasks.splice(index, 1);
      console.log(`Removed task: "${removed[0].description}"`);
    } else {
      console.log("Wrong task number: Task does not exist.");
    }
  }
}
function savingTheData(filename, tasks) {
  fs.writeFileSync(filename, JSON.stringify(tasks, null, 2), 'utf-8');
  console.log(`Data saved to ${filename}`);
}
function loadingData(filename) {
  try {
    const jsonData = fs.readFileSync(filename, 'utf-8');
    const data = JSON.parse(jsonData);
    console.log(`Data loaded from ${filename}`);
    return data;
  } catch (error) {
    console.error(`Error loading data from ${filename}`);
    return `error`;
  }
}
function editTask(index, newText){
  if(!newText) {
    console.log("Error: You didnt provide anything.");
    return;
  }
  savingTheData('database.json', tasks);
  if (index === undefined) {
    tasks[tasks.length - 1].description = newText;
    console.log(`Edited the last task to: "${newText}"`);
  } else {
    index = Number(index) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].description = newText;
      console.log(`Edited task ${index + 1} to: "${newText}"`);
    } else {
      console.log("There is no such number: Task does not exist.");
    }
  }
}


// The following line starts the application
startApp("Rafik Hawshar")
