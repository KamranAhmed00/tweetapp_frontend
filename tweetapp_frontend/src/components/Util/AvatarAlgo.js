import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),width: 35, height: 35,fontSize:20
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const BackgroundLetterAvatars=(props)=>{
    
    const name=`${props.first} ${props.last}`
    console.log(name)
  return (
      <Avatar {...stringAvatar(name)}  />
  );
}
export default BackgroundLetterAvatars;
function stringAvatarHome(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),width: 70, height: 70,fontSize:30
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
export const HomeLetterAvatars=(props)=>{
    
  const name=`${props.first} ${props.last}`
  console.log(name)
return (
    <Avatar {...stringAvatarHome(name)}  variant="square"/>
);
}
