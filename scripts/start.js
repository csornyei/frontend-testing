const { spawn } = require('child_process');
const path = require('path');

const addEventListener = (proc, processName) => {
    proc.stdout.on('data', data => console.log(`${processName}: ${data}`));
    proc.stderr.on('error', error => console.log(`ERROR: ${error}`));
    proc.on('close', code => {
        if (code === 0) {
            console.log(`${processName} ran successfully`)
        } else {
            console.log(`Code: ${code}`)
        }
    });
}


const frontendPath = path.join(__dirname, '..', 'frontend');
const backendPath = path.join(__dirname, '..', 'backend');

process.chdir(frontendPath);
const frontend = spawn('npm', ['start']);
addEventListener(frontend, 'frontendStart');
process.chdir(backendPath);
const backend = spawn('npm', ['start']);
addEventListener(backend, 'backendStart')