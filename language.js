const title = chrome.i18n.getMessage('Name');
document.getElementById('title').textContent = title;

const check = chrome.i18n.getMessage('Check');
document.getElementById('check').textContent = check;

const fontSettings = chrome.i18n.getMessage('FontSettings');
document.getElementById('font-settings').textContent = fontSettings;

const saveFont = chrome.i18n.getMessage('SaveFont');
document.getElementById('save-font').textContent = saveFont;

const reloadAllTabs = chrome.i18n.getMessage('ReloadAllTabs');
document.getElementById('reload-all-tabs').textContent = reloadAllTabs;

const request = chrome.i18n.getMessage('Request');
document.getElementById('request').innerHTML = request;

const addCurrentDomain = chrome.i18n.getMessage('AddCurrentDomain');
document.getElementById('add-current-domain').textContent = addCurrentDomain;

const currentDomain = chrome.i18n.getMessage('CurrentDomain');
document.getElementById('current-domain').textContent.replace('Current Domain', currentDomain);

const addYourself = chrome.i18n.getMessage('AddYourself');
document.getElementById('add-yourself').textContent = addYourself;

const manualDomain = chrome.i18n.getMessage('ManualDomain');
document.getElementById('manual-domain').placeholder = manualDomain;

const ignored = chrome.i18n.getMessage('Ignored');
document.getElementById('ignored').textContent = ignored;

const thDomains = chrome.i18n.getMessage('ThDomains');
document.getElementById('th-domains').textContent = thDomains;

const thDel = chrome.i18n.getMessage('ThDel');
document.getElementById('th-del').textContent = thDel;
