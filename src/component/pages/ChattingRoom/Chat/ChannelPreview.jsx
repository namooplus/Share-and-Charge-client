import React, {useContext} from 'react';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {ViewContext} from "./ViewContext"
export default function ChannelPreview({ channel, onLeaveChannel}) {
  const {view, toggleview} = useContext(ViewContext);
  console.log("toggle view", toggleview)
  const changeView = ()=>{
    if (view) toggleview(false);
    else toggleview(true);
  }
  return (
    <Paper variant="outlined" style={{ display: 'flex' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CardContent style={{ flex: '1 0 auto', minWidth: 180 }} onClick={changeView}>
          <Typography component="h5" variant="h5">
            {channel.name
             || channel.members.map(c => c.nickname || c.userId).join(', ').slice(0, 10).concat('...')
            }
          </Typography>
        </CardContent>
        <div className={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onLeaveChannel(channel, () => {
              alert(`Left channel: ${channel.url}`)
            })}
          >
            Leave
          </Button>
        </div>
      </div>
      <CardMedia
        image={
          channel.coverUrl
          || channel.members[0].profileUrl
        }
        style={{ width: 151 }}
        title={channel.url}
      />
    </Paper>
  )
}
