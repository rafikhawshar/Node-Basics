
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
 
  else if(text.startsWith('hello')) {
    const args = text.split(' ').slice(1).join(' '); // Extract argument
    hello(args);
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

// the help function show all the commands in the app 
function help(){
  console.log('List of commands:');
  console.log('  hello [optional_argument] - Says "Hello" or "Hello [argument]!" if an argument is provided');
  console.log('  quit - Exits the application');
  console.log('  exit - Exits the application');
  console.log('  help - Shows the list of commands');
}
// The following line starts the application
startApp("Rafik Hawshar")
