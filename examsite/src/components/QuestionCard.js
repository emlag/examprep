import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red, grey, green} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '80%',
        backgroundColor: grey[50],
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatarQ: {
        backgroundColor: red[500],
    },
    avatarA: {
        backgroundColor: "green",
    },
}));


//from https://material-ui.com/components/cards/
export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatarQ}>
                        Q
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Topic 1: Systems Fundamentals"
                subheader="Paper 1, May 2019"
            />
            <CardMedia
                className={classes.media}
                image="https://firebasestorage.googleapis.com/v0/b/examprep-a775e.appspot.com/o/questions%2F1595272536324?alt=media&token=bd336cc5-e299-4a91-b525-be1aa004d92a"
                title="Question 1a"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    1a: 1.1.1
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    1b: 1.1.4
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    1c: 1.1.5, 1.1.7
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    1d: 1.2.1
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <SaveAltIcon/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatarA}>
                                A
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Topic 1: Systems Fundamentals"
                        subheader="Paper 1, May 2019"
                    />
                    <CardMedia
                        className={classes.media}
                        image="https://firebasestorage.googleapis.com/v0/b/examprep-a775e.appspot.com/o/answers%2F1595272536327?alt=media&token=8a8b88b2-410a-4880-91dc-f8295cdf7c52"
                        title="Question 1a"
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
}