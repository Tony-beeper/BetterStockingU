import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
export default function PostList(props) {
  const getIcon =(rating)=>{
    switch(rating){
      case "POSITIVE":
        return <SentimentVerySatisfiedIcon/>
      case "NEGATIVE":
        return <SentimentVeryDissatisfiedIcon/>
      case "NEUTRAL":
        return <SentimentNeutralIcon/>
      default:
        return null
    }

  }
  React.useEffect(()=>{
    console.log(props.posts)
  })
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
      <List>
        {props.posts.map(post =>{
          return(
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {getIcon(post.sentiment)}
              </ListItemIcon>
              <ListItemText primary={post.title} />
            </ListItemButton>
          </ListItem>
          )

        })}
        
          
        </List>
      </nav>
      
    </Box>
  );
}
