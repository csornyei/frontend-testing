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
const frontendInstall = spawn('npm', ['install']);
addEventListener(frontendInstall, 'frontendInstall');
process.chdir(backendPath);
const backendInstall = spawn('npm', ['install']);
addEventListener(backendInstall, 'backendInstall')

console.log(__dirname);
