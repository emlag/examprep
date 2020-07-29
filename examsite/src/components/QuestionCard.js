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
        // maxWidth: '90%',
        backgroundColor: grey[50],
        // margin:'auto'
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
        backgroundColor: "blue",
    },
    avatarA: {
        backgroundColor: "green",
    },
}));


//from https://material-ui.com/components/cards/
export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    function imageDivs() {
        return (
            props.dbResult.questionImageUrls.map((url, idx) => {
                return <CardMedia
                    key={idx}
                    component="img"
                    alt="Question Number"
                    image={url}
                    title={props.dbResult.questionNum}
                />
            })
        );
    }

    function answerDivs() {
        return (
            props.dbResult.answerImageUrls.map((url, idx) => {
                return <CardMedia
                    key={idx}
                    component="img"
                    alt="Question Number"
                    image={url}
                    title={props.dbResult.questionNum}
                />
            })
        );
    }

    const questionTitle = "Topic " + props.dbResult.topics;
    const paperInfo = "Paper " + props.dbResult.paperType + ", " + props.dbResult.session + " " + props.dbResult.year


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
                title={questionTitle}
                subheader={paperInfo}
            />
            {imageDivs()}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.dbResult.subtopicMetadata}
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
                        title={questionTitle}
                        subheader={paperInfo}
                    />
                    {answerDivs()}
                </CardContent>
            </Collapse>
        </Card>
    );
}