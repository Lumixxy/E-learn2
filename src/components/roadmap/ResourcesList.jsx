import React, { useState, useEffect } from 'react';
import { Box, Text, Link, VStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import WebWarriorAPI from '../../api/webwarrior';

const ResourcesList = ({ nodeId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // MIT OCW based resources mapped to node IDs
        const mitResourcesMap = {
          // Node IDs from roadmap.json
          '1': [
            {
              title: 'MIT Lecture 1: What is Computation?',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-1-what-is-computation/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Official Tutorial - Introduction',
              url: 'https://docs.python.org/3/tutorial/introduction.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Course Syllabus',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
              type: 'course',
              source: 'MIT OCW'
            }
          ],
          // Python Basics (node-1) - already defined above
          // Data Structures (node-2)
          '2': [
            {
              title: 'MIT Lecture 5: Tuples, Lists, Aliasing, Mutability, and Cloning',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-and-cloning/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Data Structures Documentation',
              url: 'https://docs.python.org/3/tutorial/datastructures.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 4',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Variables and Data Types
          'variables': [
            {
              title: 'MIT Lecture 2: Branching and Iteration',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-2-branching-and-iteration/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Data Types Tutorial',
              url: 'https://docs.python.org/3/tutorial/introduction.html#numbers',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 1',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps1/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Data Structures
          'Data Structures': [
            {
              title: 'MIT Lecture 5: Tuples, Lists, Aliasing, Mutability, and Cloning',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-and-cloning/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Data Structures Documentation',
              url: 'https://docs.python.org/3/tutorial/datastructures.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 4',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Functions and Abstraction
          'functions': [
            {
              title: 'MIT Lecture 3: String Manipulation, Guess and Check, Approximations, Bisection',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-3-string-manipulation-guess-and-check-approximations-bisection/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Functions Tutorial',
              url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 2',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps2/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Loops and Iteration
          'loops': [
            {
              title: 'MIT Lecture 4: Decomposition, Abstraction, and Functions',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-4-decomposition-abstraction-and-functions/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Loops Tutorial',
              url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 3',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps3/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Tuples and Lists
          'tuples_lists': [
            {
              title: 'MIT Lecture 5: Tuples, Lists, Aliasing, Mutability, and Cloning',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-and-cloning/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Data Structures Tutorial',
              url: 'https://docs.python.org/3/tutorial/datastructures.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 4',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Recursion and Dictionaries
          'recursion': [
            {
              title: 'MIT Lecture 6: Recursion and Dictionaries',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-6-recursion-and-dictionaries/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Recursion Tutorial',
              url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 5',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps5/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Testing and Debugging
          'testing': [
            {
              title: 'MIT Lecture 7: Testing, Debugging, Exceptions, and Assertions',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-7-testing-debugging-exceptions-and-assertions/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Testing Tutorial',
              url: 'https://docs.python.org/3/library/unittest.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 6',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps6/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Object-Oriented Programming
          'object_oriented': [
            {
              title: 'MIT Lecture 8: Object Oriented Programming',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-8-object-oriented-programming/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Classes Tutorial',
              url: 'https://docs.python.org/3/tutorial/classes.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Problem Set 7',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps7/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Computational Complexity
          'complexity': [
            {
              title: 'MIT Lecture 10: Understanding Program Efficiency, Part 1',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-10-understanding-program-efficiency-part-1/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'MIT Lecture 11: Understanding Program Efficiency, Part 2',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-11-understanding-program-efficiency-part-2/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Performance Tutorial',
              url: 'https://docs.python.org/3/library/timeit.html',
              type: 'docs',
              source: 'Python.org'
            }
          ],
          // Search and Sort Algorithms
          'search_sort': [
            {
              title: 'MIT Lecture 12: Searching and Sorting Algorithms',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-12-searching-and-sorting-algorithms/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Sorting Tutorial',
              url: 'https://docs.python.org/3/howto/sorting.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Final Project',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/final-project/',
              type: 'assignment',
              source: 'MIT OCW'
            }
          ],
          // Algorithms (node-3)
          '3': [
            {
              title: 'MIT Lecture 12: Searching and Sorting Algorithms',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-12-searching-and-sorting-algorithms/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Algorithm Resources',
              url: 'https://docs.python.org/3/library/heapq.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Algorithm Lecture Notes',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'course',
              source: 'MIT OCW'
            }
          ],
          // OOP & Advanced Topics (node-4)
          '4': [
            {
              title: 'MIT Lecture 9: Python Classes and Inheritance',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-9-python-classes-and-inheritance/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python Advanced OOP Documentation',
              url: 'https://docs.python.org/3/tutorial/classes.html#inheritance',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Advanced Python Programming',
              url: 'https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/',
              type: 'course',
              source: 'MIT OCW'
            }
          ],
          // Package Managers (node-7)
          '7': [
            {
              title: 'Python Packaging User Guide',
              url: 'https://packaging.python.org/en/latest/',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'MIT Python Environment Setup',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/syllabus/',
              type: 'course',
              source: 'MIT OCW'
            },
            {
              title: 'Python Package Index',
              url: 'https://pypi.org/',
              type: 'docs',
              source: 'PyPI'
            }
          ],
          // Version Control (node-5)
          '5': [
            {
              title: 'MIT Missing Semester: Version Control (Git)',
              url: 'https://missing.csail.mit.edu/2020/version-control/',
              type: 'lecture',
              source: 'MIT'
            },
            {
              title: 'Git and GitHub for Python Developers',
              url: 'https://ocw.mit.edu/courses/res-str-001-geographic-information-system-gis-tutorial-january-iap-2016/pages/part-1-introduction/git-and-github/',
              type: 'tutorial',
              source: 'MIT OCW'
            },
            {
              title: 'Git Basics Exercise',
              url: 'https://missing.csail.mit.edu/2020/version-control/#exercises',
              type: 'assignment',
              source: 'MIT'
            }
          ],
          
          // Repo Hosting (node-6)
          '6': [
            {
              title: 'GitHub for MIT Projects',
              url: 'https://libguides.mit.edu/c.php?g=176372&p=1159529',
              type: 'guide',
              source: 'MIT'
            },
            {
              title: 'MIT Open Source Projects on GitHub',
              url: 'https://github.com/mit',
              type: 'resource',
              source: 'GitHub'
            },
            {
              title: 'Collaborative Development with GitHub',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/syllabus/',
              type: 'guide',
              source: 'MIT OCW'
            }
          ],
          
          // Frameworks (node-8)
          '8': [
            {
              title: 'MIT Web Development with Python',
              url: 'https://ocw.mit.edu/courses/6-148-web-programming-competition-january-iap-2011/',
              type: 'course',
              source: 'MIT OCW'
            },
            {
              title: 'Django Documentation',
              url: 'https://docs.djangoproject.com/',
              type: 'docs',
              source: 'Django Project'
            },
            {
              title: 'Flask Documentation',
              url: 'https://flask.palletsprojects.com/',
              type: 'docs',
              source: 'Pallets Projects'
            }
          ],
          // Testing (node-9)
          '9': [
            {
              title: 'MIT Lecture 7: Testing, Debugging, Exceptions, and Assertions',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-7-testing-debugging-exceptions-and-assertions/',
              type: 'video',
              source: 'MIT OCW'
            },
            {
              title: 'Python unittest Documentation',
              url: 'https://docs.python.org/3/library/unittest.html',
              type: 'docs',
              source: 'Python.org'
            },
            {
              title: 'Python pytest Documentation',
              url: 'https://docs.pytest.org/',
              type: 'docs',
              source: 'pytest.org'
            }
          ]
        };
        
        // Default resources if no specific MIT resources are found for the node
        const defaultResources = [
          {
            title: 'MIT Introduction to Computer Science and Programming in Python',
            url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
            type: 'Course',
            source: 'MIT OCW'
          },
          {
            title: 'Python Official Documentation',
            url: 'https://docs.python.org/3/',
            type: 'Documentation',
            source: 'Python.org'
          },
          {
            title: 'MIT Python Lectures',
            url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/video_galleries/lecture-videos/',
            type: 'Video',
            source: 'MIT OCW'
          }
        ];
        
        // Extract node ID without any prefix
        const cleanNodeId = nodeId.replace('node-', '');
        
        // Check if we have MIT resources for this node
        if (mitResourcesMap[cleanNodeId]) {
          console.log(`Using MIT resources for node: ${cleanNodeId}`);
          setResources(mitResourcesMap[cleanNodeId]);
        } else {
          try {
            // Try to get resources from API if no MIT resources found
            const data = await WebWarriorAPI.getNodeResources(nodeId);
            if (data && data.length > 0) {
              setResources(data);
            } else {
              // If API returns empty array, use default resources
              setResources(defaultResources);
            }
          } catch (apiErr) {
            console.error('Error fetching node resources from API:', apiErr);
            // If API call fails, use default resources
            setResources(defaultResources);
          }
        }
      } catch (err) {
        console.error('Error in resource handling:', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (nodeId) {
      fetchResources();
    }
  }, [nodeId]);

  if (loading) {
    return (
      <Box 
        textAlign="center" 
        py={6} 
        px={4}
        borderRadius="md"
        borderWidth="1px"
        borderColor="blue.100"
        bg="blue.50"
      >
        <Spinner size="md" color="blue.500" thickness="3px" speed="0.8s" />
        <Text mt={3} color="blue.600" fontWeight="medium">Loading external resources...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        status="error" 
        borderRadius="md" 
        variant="left-accent"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={4}
      >
        <AlertIcon boxSize="24px" mr={0} mb={3} />
        <Text fontWeight="medium">{error}</Text>
        <Text fontSize="sm" mt={2}>
          Try refreshing the page or check your connection.
        </Text>
      </Alert>
    );
  }

  if (resources.length === 0) {
    return (
      <Box 
        p={4} 
        borderRadius="md" 
        borderWidth="1px" 
        borderStyle="dashed" 
        borderColor="gray.300"
        bg="gray.50"
        textAlign="center"
      >
        <Text color="gray.600">No external resources available for this node yet.</Text>
      </Box>
    );
  }

  // Group resources by type
  const groupedResources = resources.reduce((acc, resource) => {
    const type = resource.type || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(resource);
    return acc;
  }, {});

  // Get resource types in a specific order
  const orderedTypes = ['video', 'docs', 'course', 'assignment', 'Documentation', 'Tutorial', 'Other'];
  const resourceTypes = Object.keys(groupedResources).sort((a, b) => {
    const indexA = orderedTypes.indexOf(a);
    const indexB = orderedTypes.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <VStack spacing={6} align="stretch">
      {resourceTypes.map(type => (
        <Box key={type}>
          <Text 
            fontSize="md" 
            fontWeight="bold" 
            color="blue.700" 
            mb={3}
            textTransform="capitalize"
            borderBottom="2px solid"
            borderColor="blue.100"
            pb={1}
          >
            {type === 'docs' ? 'Documentation' : type}
          </Text>
          
          <VStack spacing={3} align="stretch">
            {groupedResources[type].map((resource, index) => (
              <Box 
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="blue.100"
                bg="white"
                transition="all 0.2s"
                _hover={{ 
                  transform: 'translateY(-2px)', 
                  boxShadow: 'md',
                  borderColor: 'blue.300'
                }}
              >
                <Link 
                  href={resource.url} 
                  isExternal 
                  color="blue.600" 
                  fontWeight="semibold"
                  fontSize="md"
                  display="flex"
                  alignItems="center"
                >
                  {resource.title}
                  <Text as="span" ml={2}>↗</Text>
                </Link>
                
                {resource.source && (
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Source: {resource.source}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default ResourcesList;