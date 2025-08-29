import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Legend, ArcElement, RadialLinearScale, Filler } from 'chart.js';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Progress,
  Select,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Button,
  HStack,
  VStack,
  Icon,
  Tooltip,
  Divider,
} from '@chakra-ui/react';
import { useXP } from '../../contexts/XPContext';
import { useLearning } from '../../contexts/LearningContext';
import { useCompletedNodes } from '../../context/CompletedNodesContext';
import { 
  MdTrendingUp, 
  MdTrendingDown, 
  MdInsights, 
  MdOutlineTimeline, 
  MdOutlineSchool,
  MdOutlineAssignment,
  MdOutlineEmojiEvents,
  MdOutlineAutoGraph,
  MdOutlineLightbulb,
  MdOutlineCompare,
  MdOutlinePersonalVideo,
  MdPriorityHigh,
  MdVideoLibrary,
  MdMenuBook,
  MdAssignment,
  MdQuiz
} from 'react-icons/md';
// Chart components already imported and registered at the top of the file

const AdvancedAnalyticsDashboard = ({ courseId = null, courseData = null, isCourseSpecific = false }) => {
  const { totalXP, xpHistory } = useXP();
  const { completedNodes } = useCompletedNodes();
  const { learningPreferences, performanceMetrics, recommendations } = useLearning();
  
  const [timeRange, setTimeRange] = useState('month');
  const [skillFilter, setSkillFilter] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const chartGridColor = useColorModeValue('gray.200', 'gray.600');
  
  // Mock skills data
  const skillsData = {
    'frontend': {
      name: 'Frontend Development',
      progress: 68,
      subskills: {
        'html': { name: 'HTML', progress: 92 },
        'css': { name: 'CSS', progress: 78 },
        'javascript': { name: 'JavaScript', progress: 65 },
        'react': { name: 'React', progress: 55 },
      },
      trend: +12,
    },
    'backend': {
      name: 'Backend Development',
      progress: 42,
      subskills: {
        'python': { name: 'Python', progress: 75 },
        'nodejs': { name: 'Node.js', progress: 45 },
        'databases': { name: 'Databases', progress: 38 },
        'apis': { name: 'APIs', progress: 30 },
      },
      trend: +8,
    },
    'ai': {
      name: 'AI Engineering',
      progress: 25,
      subskills: {
        'ml-basics': { name: 'ML Basics', progress: 40 },
        'neural-networks': { name: 'Neural Networks', progress: 20 },
        'data-processing': { name: 'Data Processing', progress: 35 },
        'model-deployment': { name: 'Model Deployment', progress: 15 },
      },
      trend: +15,
    },
  };
  
  // Mock learning patterns data
  const learningPatternsData = {
    timeOfDay: {
      labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
      datasets: [
        {
          label: 'Activity Level',
          data: [15, 30, 45, 10],
          backgroundColor: 'rgba(66, 153, 225, 0.6)',
        },
      ],
    },
    daysOfWeek: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Hours Spent',
          data: [1.5, 2.3, 1.8, 2.0, 1.2, 3.5, 2.8],
          backgroundColor: 'rgba(72, 187, 120, 0.6)',
          borderColor: 'rgba(72, 187, 120, 1)',
          borderWidth: 1,
        },
      ],
    },
    sessionLength: {
      labels: ['<15min', '15-30min', '30-60min', '1-2hrs', '>2hrs'],
      datasets: [
        {
          label: 'Number of Sessions',
          data: [5, 12, 18, 8, 3],
          backgroundColor: [
            'rgba(237, 100, 166, 0.6)',
            'rgba(159, 122, 234, 0.6)',
            'rgba(66, 153, 225, 0.6)',
            'rgba(72, 187, 120, 0.6)',
            'rgba(237, 137, 54, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    },
  };
  
  // Mock skill acquisition data
  const skillAcquisitionData = {
    radar: {
      labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Databases'],
      datasets: [
        {
          label: 'Current Skills',
          data: [90, 75, 65, 55, 45, 70, 40],
          backgroundColor: 'rgba(66, 153, 225, 0.2)',
          borderColor: 'rgba(66, 153, 225, 1)',
          pointBackgroundColor: 'rgba(66, 153, 225, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(66, 153, 225, 1)',
        },
        {
          label: '3 Months Ago',
          data: [80, 60, 50, 35, 30, 55, 25],
          backgroundColor: 'rgba(159, 122, 234, 0.2)',
          borderColor: 'rgba(159, 122, 234, 1)',
          pointBackgroundColor: 'rgba(159, 122, 234, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(159, 122, 234, 1)',
        },
      ],
    },
  };
  
  // Mock learning efficiency data
  const learningEfficiencyData = {
    xpGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'XP Earned',
          data: [150, 320, 280, 500, 450, 650],
          backgroundColor: 'rgba(66, 153, 225, 0.2)',
          borderColor: 'rgba(66, 153, 225, 1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    completionRates: {
      labels: ['Tutorials', 'Exercises', 'Projects', 'Quizzes', 'Assignments'],
      datasets: [
        {
          label: 'Completion Rate (%)',
          data: [95, 85, 70, 90, 75],
          backgroundColor: [
            'rgba(72, 187, 120, 0.6)',
            'rgba(66, 153, 225, 0.6)',
            'rgba(237, 137, 54, 0.6)',
            'rgba(159, 122, 234, 0.6)',
            'rgba(237, 100, 166, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    },
  };
  
  // Mock peer comparison data
  const peerComparisonData = {
    progressComparison: {
      labels: ['Course Completion', 'Assignments', 'XP Earned', 'Skill Level', 'Engagement'],
      datasets: [
        {
          label: 'You',
          data: [75, 85, 65, 70, 80],
          backgroundColor: 'rgba(66, 153, 225, 0.2)',
          borderColor: 'rgba(66, 153, 225, 1)',
          pointBackgroundColor: 'rgba(66, 153, 225, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(66, 153, 225, 1)',
        },
        {
          label: 'Peer Average',
          data: [65, 70, 60, 65, 75],
          backgroundColor: 'rgba(159, 122, 234, 0.2)',
          borderColor: 'rgba(159, 122, 234, 1)',
          pointBackgroundColor: 'rgba(159, 122, 234, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(159, 122, 234, 1)',
        },
        {
          label: 'Top Performers',
          data: [95, 90, 85, 90, 95],
          backgroundColor: 'rgba(72, 187, 120, 0.2)',
          borderColor: 'rgba(72, 187, 120, 1)',
          pointBackgroundColor: 'rgba(72, 187, 120, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(72, 187, 120, 1)',
        },
      ],
    },
  };
  
  // Generate analytics data based on course ID or overall data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (isCourseSpecific) {
        // Generate course-specific analytics data
        const courseSpecificData = {
          skillsData: {
            // Extract relevant skills based on course content
            ...Object.fromEntries(
              Object.entries(skillsData).filter(([key]) => {
                // Filter skills relevant to this course
                // This is a simplified example - in a real app, you'd match course content to skills
                if (courseData.title.toLowerCase().includes('react')) return key === 'frontend';
                if (courseData.title.toLowerCase().includes('python')) return key === 'backend' || key === 'ai';
                return true; // Include all skills if no specific match
              })
            )
          },
          // Course-specific learning patterns
          learningPatternsData: {
            ...learningPatternsData,
            // Add course-specific session data
            courseProgress: {
              labels: courseData?.modules?.map(m => m.title.substring(0, 15) + '...') || [],
              datasets: [{
                label: 'Completion %',
                data: courseData?.modules?.map(() => Math.floor(Math.random() * 100)) || [],
                backgroundColor: 'rgba(66, 153, 225, 0.6)',
                borderColor: 'rgba(66, 153, 225, 1)',
                borderWidth: 1,
              }]
            }
          },
          // Adapt other data for course-specific view
          skillAcquisitionData,
          learningEfficiencyData: {
            ...learningEfficiencyData,
            // Add course-specific efficiency metrics
            moduleCompletionTime: {
              labels: courseData?.modules?.map(m => m.title.substring(0, 10) + '...') || [],
              datasets: [{
                label: 'Time to Complete (hours)',
                data: courseData?.modules?.map(() => (Math.random() * 5 + 1).toFixed(1)) || [],
                backgroundColor: 'rgba(72, 187, 120, 0.6)',
              }]
            }
          },
          peerComparisonData,
        };
        
        setAnalyticsData(courseSpecificData);
      } else {
        // Use overall data for general analytics dashboard
        setAnalyticsData({
          skillsData,
          learningPatternsData,
          skillAcquisitionData,
          learningEfficiencyData,
          peerComparisonData,
        });
      }
      
      setIsLoading(false);
    }, 1000);
  }, [courseId, courseData, isCourseSpecific, timeRange]);
  
  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartGridColor,
        },
      },
      x: {
        grid: {
          color: chartGridColor,
        },
      },
    },
  };
  
  const radarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: chartGridColor,
        },
        grid: {
          color: chartGridColor,
        },
        ticks: {
          backdropColor: 'transparent',
        },
      },
    },
  };
  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartGridColor,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
  };
  
  if (isLoading) {
    return (
      <Box p={5} textAlign="center">
        <Text>Loading analytics data...</Text>
        <Progress size="xs" isIndeterminate colorScheme="blue" mt={2} />
      </Box>
    );
  }
  
  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">
          {courseId ? 'Course Analytics Dashboard' : 'Learning Analytics Dashboard'}
        </Heading>
        <HStack spacing={4}>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            size="sm"
            w="150px"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </Select>
          {!courseId && (
            <Select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              size="sm"
              w="180px"
            >
              <option value="all">All Skills</option>
              <option value="frontend">Frontend Development</option>
              <option value="backend">Backend Development</option>
              <option value="ai">AI Engineering</option>
            </Select>
          )}
        </HStack>
      </Flex>
      
      {/* Course-specific header when viewing course analytics */}
      {isCourseSpecific && (
        <Box mb={6} p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <Heading size="md" mb={3}>{courseData?.title || 'Course Analytics'}</Heading>
          <Text color={subTextColor} mb={3}>{courseData?.description || 'Detailed analytics for this course'}</Text>
          <Progress 
            value={courseData?.completedModules ? (courseData.completedModules / courseData.totalModules) * 100 : 25} 
            size="sm" 
            colorScheme="blue" 
            mb={2} 
          />
          <Flex justifyContent="space-between">
            <Text fontSize="sm" color={subTextColor}>
              {courseData?.completedModules || 0} of {courseData?.totalModules || 0} modules completed
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={accentColor}>
              {courseData?.completedModules ? Math.round((courseData.completedModules / courseData.totalModules) * 100) : 25}% Complete
            </Text>
          </Flex>
        </Box>
      )}
      
      {/* Overview Stats */}
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} mb={6}>
        <GridItem>
          <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={MdOutlineSchool} mr={2} />
                Total XP
              </StatLabel>
              <StatNumber fontSize="2xl" color={accentColor}>{totalXP}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23% increase
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        
        <GridItem>
          <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={MdOutlineAssignment} mr={2} />
                Completed Tasks
              </StatLabel>
              <StatNumber fontSize="2xl" color={accentColor}>{completedNodes ? completedNodes.length : 0}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12% increase
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        
        <GridItem>
          <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={MdOutlineEmojiEvents} mr={2} />
                Skill Level
              </StatLabel>
              <StatNumber fontSize="2xl" color={accentColor}>
                {skillFilter === 'all' ? 'Intermediate' : analyticsData.skillsData[skillFilter]?.progress + '%'}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {skillFilter === 'all' ? '15%' : analyticsData.skillsData[skillFilter]?.trend + '%'} increase
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        
        <GridItem>
          <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={MdOutlineTimeline} mr={2} />
                Learning Streak
              </StatLabel>
              <StatNumber fontSize="2xl" color={accentColor}>7 days</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Best: 14 days
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>
      </Grid>
      
      <Tabs variant="enclosed" colorScheme="blue" mb={6}>
        <TabList>
          <Tab><Icon as={MdOutlineAutoGraph} mr={2} /> Learning Patterns</Tab>
          <Tab><Icon as={MdOutlineSchool} mr={2} /> Skill Acquisition</Tab>
          <Tab><Icon as={MdInsights} mr={2} /> Learning Efficiency</Tab>
          <Tab><Icon as={MdOutlineCompare} mr={2} /> Peer Comparison</Tab>
          <Tab><Icon as={MdOutlineLightbulb} mr={2} /> Recommendations</Tab>
        </TabList>
        
        <TabPanels>
          {/* Learning Patterns Tab */}
          <TabPanel>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap={6}>
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Activity by Time of Day</Heading>
                  <Box h="300px">
                    <Bar 
                      data={analyticsData.learningPatternsData.timeOfDay} 
                      options={barChartOptions} 
                    />
                  </Box>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Weekly Learning Pattern</Heading>
                  <Box h="300px">
                    <Line 
                      data={analyticsData.learningPatternsData.daysOfWeek} 
                      options={lineChartOptions} 
                    />
                  </Box>
                </Box>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Session Length Distribution</Heading>
                  <Flex justifyContent="center">
                    <Box w="50%" h="300px">
                      <Doughnut 
                        data={analyticsData.learningPatternsData.sessionLength} 
                        options={doughnutChartOptions} 
                      />
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Learning Pattern Insights</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack>
                      <Icon as={MdTrendingUp} color="green.500" boxSize={5} />
                      <Text>You're most productive in the <b>evening</b> between 6-9 PM.</Text>
                    </HStack>
                    <HStack>
                      <Icon as={MdTrendingUp} color="green.500" boxSize={5} />
                      <Text>Your weekend learning sessions are <b>42% longer</b> than weekday sessions.</Text>
                    </HStack>
                    <HStack>
                      <Icon as={MdTrendingDown} color="red.500" boxSize={5} />
                      <Text>Your learning consistency drops on <b>Thursdays</b> and <b>Fridays</b>.</Text>
                    </HStack>
                    <HStack>
                      <Icon as={MdOutlineLightbulb} color="yellow.500" boxSize={5} />
                      <Text>Try scheduling more <b>30-60 minute sessions</b> for optimal learning retention.</Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
          
          {/* Skill Acquisition Tab */}
          <TabPanel>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Skill Radar</Heading>
                  <Box h="400px">
                    <Radar 
                      data={analyticsData.skillAcquisitionData.radar} 
                      options={radarChartOptions} 
                    />
                  </Box>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Skill Breakdown</Heading>
                  <VStack spacing={4} align="stretch">
                    {Object.keys(analyticsData.skillsData).map((skillKey) => {
                      const skill = analyticsData.skillsData[skillKey];
                      return (
                        <Box key={skillKey}>
                          <Flex justify="space-between" align="center" mb={1}>
                            <Text fontWeight="medium">{skill.name}</Text>
                            <HStack>
                              <Text>{skill.progress}%</Text>
                              <Badge colorScheme="green">
                                +{skill.trend}%
                              </Badge>
                            </HStack>
                          </Flex>
                          <Progress 
                            value={skill.progress} 
                            colorScheme={skill.progress > 75 ? "green" : skill.progress > 50 ? "blue" : skill.progress > 25 ? "yellow" : "red"}
                            size="sm"
                            borderRadius="full"
                            mb={2}
                          />
                        </Box>
                      );
                    })}
                  </VStack>
                </Box>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, lg: 3 }}>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Skill Acquisition Insights</Heading>
                  <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
                    <GridItem>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Icon as={MdTrendingUp} color="green.500" boxSize={5} />
                          <Text>Fastest growing skill: <b>React</b> (+18%)</Text>
                        </HStack>
                        <HStack>
                          <Icon as={MdTrendingDown} color="red.500" boxSize={5} />
                          <Text>Skill gap identified: <b>Databases</b></Text>
                        </HStack>
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Icon as={MdOutlineLightbulb} color="yellow.500" boxSize={5} />
                          <Text>You excel at <b>visual learning</b> for new concepts</Text>
                        </HStack>
                        <HStack>
                          <Icon as={MdOutlineLightbulb} color="yellow.500" boxSize={5} />
                          <Text>Practice more <b>hands-on projects</b> to improve retention</Text>
                        </HStack>
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Icon as={MdOutlinePersonalVideo} color="blue.500" boxSize={5} />
                          <Text>Recommended focus: <b>API Development</b></Text>
                        </HStack>
                        <HStack>
                          <Icon as={MdOutlinePersonalVideo} color="blue.500" boxSize={5} />
                          <Text>Next milestone: <b>Full-stack Integration</b></Text>
                        </HStack>
                      </VStack>
                    </GridItem>
                  </Grid>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
          
          {/* Learning Efficiency Tab */}
          <TabPanel>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap={6}>
              {isCourseSpecific && (
                <GridItem colSpan={{ base: 1, lg: 2 }} mb={4}>
                  <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                    <Heading size="md" mb={4}>Module Completion Time</Heading>
                    <Box h="300px">
                      <Bar
                        data={analyticsData.learningEfficiencyData.moduleCompletionTime}
                        options={barChartOptions}
                      />
                    </Box>
                    <Text fontSize="sm" color={subTextColor} mt={3}>
                      This chart shows how long it took you to complete each module compared to the average time.
                    </Text>
                  </Box>
                </GridItem>
              )}
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>XP Growth Over Time</Heading>
                  <Box h="300px">
                    <Line 
                      data={analyticsData.learningEfficiencyData.xpGrowth} 
                      options={lineChartOptions} 
                    />
                  </Box>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Completion Rates by Content Type</Heading>
                  <Box h="300px">
                    <Bar 
                      data={analyticsData.learningEfficiencyData.completionRates} 
                      options={barChartOptions} 
                    />
                  </Box>
                </Box>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Learning Efficiency Metrics</Heading>
                  <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
                    <GridItem>
                      <Stat>
                        <StatLabel>Average Session Productivity</StatLabel>
                        <StatNumber>78%</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          12% increase
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                    
                    <GridItem>
                      <Stat>
                        <StatLabel>Knowledge Retention</StatLabel>
                        <StatNumber>85%</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          5% increase
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                    
                    <GridItem>
                      <Stat>
                        <StatLabel>XP per Hour</StatLabel>
                        <StatNumber>42</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          8% increase
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                    
                    <GridItem>
                      <Stat>
                        <StatLabel>Learning Velocity</StatLabel>
                        <StatNumber>Fast</StatNumber>
                        <StatHelpText>
                          Top 25% of learners
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                  </Grid>
                  
                  <Divider my={4} />
                  
                  <Heading size="sm" mb={3}>Efficiency Recommendations</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack>
                      <Icon as={MdOutlineLightbulb} color="yellow.500" boxSize={5} />
                      <Text>Try the <b>Pomodoro Technique</b> (25min focus, 5min break) to improve focus.</Text>
                    </HStack>
                    <HStack>
                      <Icon as={MdOutlineLightbulb} color="yellow.500" boxSize={5} />
                      <Text>Review completed content after 7 days to improve long-term retention.</Text>
                    </HStack>
                    <HStack>
                      <Icon as={MdOutlineLightbulb} color="yellow.500" boxSize={5} />
                      <Text>Your quiz performance improves when you take them in the <b>morning</b>.</Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
          
          {/* Peer Comparison Tab */}
          <TabPanel>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap={6}>
              {isCourseSpecific && (
                <GridItem colSpan={{ base: 1, lg: 2 }} mb={4}>
                  <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                    <Heading size="md" mb={4}>Course Completion Percentile</Heading>
                    <Flex justify="center" align="center" direction="column">
                      <Box position="relative" w="200px" h="200px" mb={4}>
                        <Doughnut
                          data={{
                            labels: ['Your Progress', 'Remaining'],
                            datasets: [
                              {
                                data: [85, 15],
                                backgroundColor: ['#4299E1', '#EDF2F7'],
                                borderWidth: 0,
                              },
                            ],
                          }}
                          options={{
                            cutout: '70%',
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                          }}
                        />
                        <Flex
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          justify="center"
                          align="center"
                          direction="column"
                        >
                          <Text fontSize="3xl" fontWeight="bold" color={accentColor}>
                            85%
                          </Text>
                          <Text fontSize="xs" color={subTextColor}>
                            Percentile
                          </Text>
                        </Flex>
                      </Box>
                      <Text textAlign="center" mb={2}>
                        You're in the <b>top 15%</b> of students in this course
                      </Text>
                      <Text fontSize="sm" color={subTextColor} textAlign="center">
                        Based on completion time, quiz scores, and engagement
                      </Text>
                    </Flex>
                  </Box>
                </GridItem>
              )}
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Performance Comparison</Heading>
                  <Box h="400px">
                    <Radar 
                      data={analyticsData.peerComparisonData.progressComparison} 
                      options={radarChartOptions} 
                    />
                  </Box>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Your Strengths</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack>
                      <Badge colorScheme="green" p={2} borderRadius="md">
                        Top 15%
                      </Badge>
                      <Text fontWeight="medium">Assignment Completion Rate</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="green" p={2} borderRadius="md">
                        Top 22%
                      </Badge>
                      <Text fontWeight="medium">Code Quality Scores</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="green" p={2} borderRadius="md">
                        Top 18%
                      </Badge>
                      <Text fontWeight="medium">Learning Consistency</Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Growth Opportunities</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack>
                      <Badge colorScheme="red" p={2} borderRadius="md">
                        Bottom 40%
                      </Badge>
                      <Text fontWeight="medium">Project Complexity</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="yellow" p={2} borderRadius="md">
                        Average
                      </Badge>
                      <Text fontWeight="medium">Peer Collaboration</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="yellow" p={2} borderRadius="md">
                        Average
                      </Badge>
                      <Text fontWeight="medium">Advanced Topic Exploration</Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
          
          {/* Recommendations Tab */}
          <TabPanel>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {isCourseSpecific && (
                <GridItem colSpan={{ base: 1, lg: 3 }} mb={4}>
                  <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                    <Heading size="md" mb={4}>Course-Specific Recommendations</Heading>
                    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
                      <GridItem>
                        <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                          <Heading size="sm" mb={2}>Focus Areas</Heading>
                          <VStack align="start" spacing={2}>
                            <HStack>
                              <Icon as={MdPriorityHigh} color="red.500" />
                              <Text>Module 3: Advanced Concepts</Text>
                            </HStack>
                            <HStack>
                              <Icon as={MdPriorityHigh} color="orange.500" />
                              <Text>Practice Exercise 5</Text>
                            </HStack>
                            <Text fontSize="sm" color={subTextColor} mt={1}>
                              Based on your quiz performance and time spent
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>
                      
                      <GridItem>
                        <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                          <Heading size="sm" mb={2}>Suggested Resources</Heading>
                          <VStack align="start" spacing={2}>
                            <HStack>
                              <Icon as={MdVideoLibrary} color="blue.500" />
                              <Text>Supplementary Video: Core Concepts</Text>
                            </HStack>
                            <HStack>
                              <Icon as={MdMenuBook} color="green.500" />
                              <Text>External Reading: Best Practices</Text>
                            </HStack>
                            <Text fontSize="sm" color={subTextColor} mt={1}>
                              Personalized to your learning style
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>
                      
                      <GridItem>
                        <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                          <Heading size="sm" mb={2}>Next Steps</Heading>
                          <VStack align="start" spacing={2}>
                            <HStack>
                              <Icon as={MdAssignment} color="purple.500" />
                              <Text>Complete Practice Project</Text>
                            </HStack>
                            <HStack>
                              <Icon as={MdQuiz} color="teal.500" />
                              <Text>Take Module 4 Readiness Quiz</Text>
                            </HStack>
                            <Text fontSize="sm" color={subTextColor} mt={1}>
                              Optimized for your learning pace
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>
                    </Grid>
                  </Box>
                </GridItem>
              )}
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Recommended Learning Paths</Heading>
                  <VStack align="start" spacing={4}>
                    <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                      <Heading size="sm" mb={2}>Full-Stack Web Development</Heading>
                      <Text fontSize="sm" color={subTextColor} mb={2}>Based on your frontend progress and interest in backend</Text>
                      <HStack>
                        <Badge colorScheme="green">98% Match</Badge>
                        <Badge colorScheme="blue">Intermediate</Badge>
                      </HStack>
                    </Box>
                    
                    <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                      <Heading size="sm" mb={2}>React Advanced Patterns</Heading>
                      <Text fontSize="sm" color={subTextColor} mb={2}>Builds on your React foundation</Text>
                      <HStack>
                        <Badge colorScheme="green">95% Match</Badge>
                        <Badge colorScheme="purple">Advanced</Badge>
                      </HStack>
                    </Box>
                    
                    <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                      <Heading size="sm" mb={2}>Python for Data Science</Heading>
                      <Text fontSize="sm" color={subTextColor} mb={2}>Leverages your Python skills for AI/ML</Text>
                      <HStack>
                        <Badge colorScheme="yellow">82% Match</Badge>
                        <Badge colorScheme="blue">Intermediate</Badge>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Skill Gap Recommendations</Heading>
                  <VStack align="start" spacing={4}>
                    <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                      <Heading size="sm" mb={2}>Database Design & SQL</Heading>
                      <Text fontSize="sm" color={subTextColor} mb={2}>Identified gap in your backend skills</Text>
                      <Progress value={38} colorScheme="red" size="sm" mb={2} />
                      <Text fontSize="sm">Current proficiency: 38%</Text>
                    </Box>
                    
                    <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                      <Heading size="sm" mb={2}>API Development</Heading>
                      <Text fontSize="sm" color={subTextColor} mb={2}>Essential for full-stack development</Text>
                      <Progress value={30} colorScheme="red" size="sm" mb={2} />
                      <Text fontSize="sm">Current proficiency: 30%</Text>
                    </Box>
                    
                    <Box p={3} borderWidth="1px" borderRadius="md" w="100%">
                      <Heading size="sm" mb={2}>Testing & CI/CD</Heading>
                      <Text fontSize="sm" color={subTextColor} mb={2}>Important for professional development</Text>
                      <Progress value={25} colorScheme="red" size="sm" mb={2} />
                      <Text fontSize="sm">Current proficiency: 25%</Text>
                    </Box>
                  </VStack>
                </Box>
              </GridItem>
              
              <GridItem>
                <Box p={4} borderRadius="md" boxShadow="sm" bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={4}>Learning Style Optimization</Heading>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Heading size="sm" mb={2}>Your Learning Profile</Heading>
                      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <GridItem>
                          <Text fontWeight="medium">Primary Style:</Text>
                        </GridItem>
                        <GridItem>
                          <Text>Visual-Practical</Text>
                        </GridItem>
                        
                        <GridItem>
                          <Text fontWeight="medium">Optimal Session:</Text>
                        </GridItem>
                        <GridItem>
                          <Text>45-60 minutes</Text>
                        </GridItem>
                        
                        <GridItem>
                          <Text fontWeight="medium">Best Time:</Text>
                        </GridItem>
                        <GridItem>
                          <Text>Evening</Text>
                        </GridItem>
                        
                        <GridItem>
                          <Text fontWeight="medium">Retention Method:</Text>
                        </GridItem>
                        <GridItem>
                          <Text>Project-based</Text>
                        </GridItem>
                      </Grid>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Heading size="sm" mb={2}>Recommended Adjustments</Heading>
                      <VStack align="start" spacing={2}>
                        <HStack>
                          <Icon as={MdOutlineLightbulb} color="yellow.500" />
                          <Text>Use more diagram-based notes</Text>
                        </HStack>
                        <HStack>
                          <Icon as={MdOutlineLightbulb} color="yellow.500" />
                          <Text>Build mini-projects for new concepts</Text>
                        </HStack>
                        <HStack>
                          <Icon as={MdOutlineLightbulb} color="yellow.500" />
                          <Text>Try pair programming for complex topics</Text>
                        </HStack>
                        <HStack>
                          <Icon as={MdOutlineLightbulb} color="yellow.500" />
                          <Text>Schedule review sessions 7 days after learning</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Action Buttons */}
      <Flex justifyContent="center" mt={6}>
        <Button colorScheme="blue" size="lg" mr={4}>
          Generate Detailed Report
        </Button>
        <Button colorScheme="green" size="lg">
          Set Learning Goals
        </Button>
      </Flex>
    </Box>
  );
};

export default AdvancedAnalyticsDashboard;