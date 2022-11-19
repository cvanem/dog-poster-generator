import pkg from '../package.json';
import theme from './theme';

export function hostAddress(append?) {
  return (
    window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + (append !== undefined ? append : '')
  );
}

export function printHeader() {
  console.log(
    `%c    
██████╗      ██████╗      ███████╗    Name: ${pkg.name} 
██╔══██╗     ██╔══██╗     ██╔════╝    Version: ${pkg.version}
██║  ██║████╗██████╔╝████╗██║ ████╗   
██║  ██║╚═══╝██╔═══╝ ╚═══╝██║   ██║   Host: ${hostAddress()} 
██████╔╝     ██║          ███████╔╝   Environment: ${process.env.NODE_ENV}
╚═════╝      ╚═╝          ╚══════╝                              
`,
    'font-family:monospace;color:' + theme.palette.primary.main + ';font-size:12px;'
  );
}

export const publicUrl = path => process.env.PUBLIC_URL + path; // For correct url mapping when hosted on GH pages

export function isEmpty(str: any) {
  return !str || 0 === str.length;
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, '');
}

// Creates a suspender for use with React.Suspense
export function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}
