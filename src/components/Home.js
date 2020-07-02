import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Tab,
  Box,
  Tabs,
  Paper,
} from '@material-ui/core';
import {
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdbreact";
import PollCard from '../components/PollCard';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  customTabRoot: {
    color: "#2cbbad",
    backgroundColor: "#fff",
  },
  customTabIndicator: {
    backgroundColor: "#2cbbad"
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div className="tab-panel">
            {children}
          </div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Home = props => {
  const theme = useTheme();
  const classes = useStyles();
  const {
    answeredQuesIds,
    unansweredQuesIds
  } = props;
  const [value, setValue] = useState(0);
  const [answeredQuestioIds, setAnsweredQuestioIds] = useState([]);
  const [unansweredQuestioIds, setUnansweredQuestioIds] = useState([]);


  const handleChange = (_, newValue) => {
    setValue(newValue);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  }

  useEffect(() => {
    answeredQuesIds && setAnsweredQuestioIds([...answeredQuesIds]);
    unansweredQuesIds && setUnansweredQuestioIds([...unansweredQuesIds]);
  }, [answeredQuesIds, unansweredQuesIds])

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="8" md="8" sm="6" size="12" className="offset-lg-2 offset-md-2 offset-sm-3 mt-20">
          <Paper className={classes.root}>
            <Tabs
              centered
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              classes={{
                root: classes.customTabRoot,
                indicator: classes.customTabIndicator
              }}
            >
              <Tab label="Unanswered Questions"  {...a11yProps(0)} />
              <Tab label="Answered Questions"  {...a11yProps(1)} />
            </Tabs>
            <SwipeableViews
              index={value}
              onChangeIndex={handleChangeIndex}
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <PollCard type="unanswered" questionIds={unansweredQuestioIds} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <PollCard type="answered" questionIds={answeredQuestioIds} />
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const mapStateToProps = state => {
  const { questions, authedUser } = state;
  if (!authedUser) return;
  const sort = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  const answeredQuesIds = [];
  const unansweredQuesIds = [];
  sort.map(v => {
    const merge = [...questions[v].optionOne.votes, ...questions[v].optionTwo.votes];
    merge.includes(authedUser) ? answeredQuesIds.push(v) : unansweredQuesIds.push(v)
    return merge;
  });
  return {
    answeredQuesIds,
    unansweredQuesIds
  };
}

export default connect(mapStateToProps)(Home);