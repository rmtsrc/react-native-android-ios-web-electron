'use strict';

import { BrowserWindow, app, dialog } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const browserWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, webSecurity: false, devTools: isDevelopment },
  });

  if (isDevelopment) {
    browserWindow.webContents.openDevTools();
  }

  if (isDevelopment) {
    browserWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    // Code could also be updated via a service worker
    browserWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  browserWindow.on('closed', () => {
    mainWindow = null;
  });

  browserWindow.webContents.on('devtools-opened', () => {
    browserWindow.focus();
    setImmediate(() => {
      browserWindow.focus();
    });
  });

  return browserWindow;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
  autoUpdater.checkForUpdatesAndNotify();
  setInterval(autoUpdater.checkForUpdatesAndNotify, 60 * 60 * 1000);
});

autoUpdater.on('checking-for-update', () => {
  log.info(`${app.getVersion()}. Checking for update...`);
});
autoUpdater.on('update-available', (info) => {
  log.info('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available.');
});
autoUpdater.on('error', (err) => {
  log.info(`Error in auto-updater. ${err}`);
});
autoUpdater.on('download-progress', (progressObj) => {
  log.info(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`
  );
});
autoUpdater.on('update-downloaded', async (ev, info) => {
  const { response } = await dialog.showMessageBox({
    type: 'info',
    buttons: ['Update', 'Later'],
    title: 'Application Update',
    message: 'A new version has been downloaded. Would you like to apply the update?',
  });
  if (response === 0) autoUpdater.quitAndInstall();
});
