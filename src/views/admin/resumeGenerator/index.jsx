import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  useToast,
  Divider,
  IconButton,
  Badge,
  Card,
  CardBody,
  Heading,
  Flex,
  Spacer,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FiUser,
  FiBook,
  FiBriefcase,
  FiAward,
  FiFileText,
  FiDownload,
  FiEye,
  FiEdit3,
  FiPlus,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiGithub,
} from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Resume Data Structure
const initialResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};

const ResumeGenerator = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeSection, setActiveSection] = useState('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const previewRef = useRef();
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const primaryColor = useColorModeValue('blue.500', 'blue.300');

  // Update resume data
  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Add new item to array sections
  const addItem = (section) => {
    const newItem = getEmptyItem(section);
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  // Remove item from array sections
  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Update item in array sections
  const updateItem = (section, index, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, ...data } : item
      )
    }));
  };

  // Get empty item template
  const getEmptyItem = (section) => {
    const templates = {
      education: {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      },
      experience: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      },
      skills: {
        category: '',
        skills: '',
      },
      projects: {
        name: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: '',
      },
      certifications: {
        name: '',
        issuer: '',
        date: '',
        link: '',
      },
    };
    return templates[section] || {};
  };

  // Generate PDF
  const generatePDF = async () => {
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
      
      toast({
        title: 'Resume Downloaded!',
        description: 'Your resume has been successfully generated and downloaded.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Form Sections
  const sections = [
    { id: 'personal', name: 'Personal Info', icon: FiUser },
    { id: 'education', name: 'Education', icon: FiBook },
    { id: 'experience', name: 'Experience', icon: FiBriefcase },
    { id: 'skills', name: 'Skills', icon: FiAward },
    { id: 'projects', name: 'Projects', icon: FiFileText },
  ];

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="7xl">
        <VStack spacing={8}>
          {/* Header */}
          <Box textAlign="center" w="full">
            <Heading size="xl" color={textColor} mb={2}>
                  Resume Generator
            </Heading>
            <Text color="gray.500" fontSize="lg">
              Create a professional resume with our easy-to-use builder
                </Text>
              </Box>

          {/* Main Content */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8} w="full">
            {/* Form Section */}
            <GridItem>
              <Card bg={cardBg} shadow="lg" borderRadius="xl">
                <CardBody p={6}>
                  <VStack spacing={6} align="stretch">
                    {/* Section Navigation */}
                    <HStack spacing={2} overflowX="auto" pb={2}>
                      {sections.map((section) => (
                        <Button
                          key={section.id}
                          size="sm"
                          variant={activeSection === section.id ? 'solid' : 'outline'}
                          colorScheme="blue"
                          leftIcon={<Icon as={section.icon} />}
                          onClick={() => setActiveSection(section.id)}
                          whiteSpace="nowrap"
                        >
                          {section.name}
                        </Button>
                      ))}
                    </HStack>

                    <Divider />

                    {/* Form Content */}
                    <Box>
                      {activeSection === 'personal' && (
                        <PersonalInfoForm
                          data={resumeData.personalInfo}
                          updateData={(data) => updateResumeData('personalInfo', data)}
                        />
                      )}
                      {activeSection === 'education' && (
                        <EducationForm
                          data={resumeData.education}
                          addItem={() => addItem('education')}
                          removeItem={(index) => removeItem('education', index)}
                          updateItem={(index, data) => updateItem('education', index, data)}
                        />
                      )}
                      {activeSection === 'experience' && (
                        <ExperienceForm
                          data={resumeData.experience}
                          addItem={() => addItem('experience')}
                          removeItem={(index) => removeItem('experience', index)}
                          updateItem={(index, data) => updateItem('experience', index, data)}
                        />
                      )}
                      {activeSection === 'skills' && (
                        <SkillsForm
                          data={resumeData.skills}
                          addItem={() => addItem('skills')}
                          removeItem={(index) => removeItem('skills', index)}
                          updateItem={(index, data) => updateItem('skills', index, data)}
                        />
                      )}
                      {activeSection === 'projects' && (
                        <ProjectsForm
                          data={resumeData.projects}
                          addItem={() => addItem('projects')}
                          removeItem={(index) => removeItem('projects', index)}
                          updateItem={(index, data) => updateItem('projects', index, data)}
                        />
                      )}
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            {/* Preview Section */}
            <GridItem>
              <Card bg={cardBg} shadow="lg" borderRadius="xl">
                <CardBody p={6}>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md" color={textColor}>
                        Resume Preview
                      </Heading>
                      <HStack spacing={2}>
                <Button
                          size="sm"
                  variant="outline"
                          leftIcon={<Icon as={FiEye} />}
                          onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                          {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                </Button>
                <Button
                          size="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={FiDownload} />}
                          onClick={generatePDF}
                        >
                          Download PDF
                </Button>
              </HStack>
                    </HStack>

                    <Divider />

                    {/* Resume Preview */}
                    <Box
                      ref={previewRef}
                      bg="white"
                      p={6}
                      borderRadius="md"
                      border="1px solid"
                      borderColor={borderColor}
                      minH="600px"
                      className="resume-preview"
                    >
                      <ResumePreview data={resumeData} />
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

// Personal Info Form Component
const PersonalInfoForm = ({ data, updateData }) => {
  const handleChange = (field, value) => {
    updateData({ ...data, [field]: value });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" color="gray.700">Personal Information</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
        <FormField
          label="First Name"
          value={data.firstName}
          onChange={(value) => handleChange('firstName', value)}
          icon={FiUser}
        />
        <FormField
          label="Last Name"
          value={data.lastName}
          onChange={(value) => handleChange('lastName', value)}
          icon={FiUser}
        />
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
        <FormField
          label="Email"
          value={data.email}
          onChange={(value) => handleChange('email', value)}
          icon={FiMail}
                    type="email"
                  />
        <FormField
          label="Phone"
          value={data.phone}
          onChange={(value) => handleChange('phone', value)}
          icon={FiPhone}
          type="tel"
        />
      </Grid>

      <FormField
        label="Address"
        value={data.address}
        onChange={(value) => handleChange('address', value)}
        icon={FiMapPin}
      />

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
        <FormField
          label="City"
          value={data.city}
          onChange={(value) => handleChange('city', value)}
          icon={FiMapPin}
        />
        <FormField
          label="State"
          value={data.state}
          onChange={(value) => handleChange('state', value)}
          icon={FiMapPin}
        />
        <FormField
          label="ZIP Code"
          value={data.zipCode}
          onChange={(value) => handleChange('zipCode', value)}
          icon={FiMapPin}
        />
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
        <FormField
          label="Website"
          value={data.website}
          onChange={(value) => handleChange('website', value)}
          icon={FiGlobe}
          type="url"
        />
        <FormField
          label="LinkedIn"
          value={data.linkedin}
          onChange={(value) => handleChange('linkedin', value)}
          icon={FiLinkedin}
          type="url"
        />
              </Grid>

      <FormField
        label="GitHub"
        value={data.github}
        onChange={(value) => handleChange('github', value)}
        icon={FiGithub}
        type="url"
      />

      <FormField
        label="Professional Summary"
        value={data.summary}
        onChange={(value) => handleChange('summary', value)}
        isTextarea
        placeholder="Write a brief professional summary..."
      />
    </VStack>
  );
};

// Education Form Component
const EducationForm = ({ data, addItem, removeItem, updateItem }) => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Heading size="md" color="gray.700">Education</Heading>
        <Button size="sm" leftIcon={<Icon as={FiPlus} />} onClick={addItem}>
                  Add Education
                </Button>
      </HStack>

      {data.map((education, index) => (
        <Card key={index} variant="outline" p={4}>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Education #{index + 1}</Text>
                    <IconButton
                size="sm"
                icon={<Icon as={FiTrash2} />}
                onClick={() => removeItem(index)}
                      colorScheme="red"
                      variant="ghost"
              />
            </HStack>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Institution"
                value={education.institution}
                onChange={(value) => updateItem(index, { institution: value })}
              />
              <FormField
                label="Degree"
                value={education.degree}
                onChange={(value) => updateItem(index, { degree: value })}
              />
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Field of Study"
                value={education.field}
                onChange={(value) => updateItem(index, { field: value })}
              />
              <FormField
                label="GPA"
                value={education.gpa}
                onChange={(value) => updateItem(index, { gpa: value })}
              />
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Start Date"
                value={education.startDate}
                onChange={(value) => updateItem(index, { startDate: value })}
                        type="month"
              />
              <FormField
                label="End Date"
                value={education.endDate}
                onChange={(value) => updateItem(index, { endDate: value })}
                        type="month"
                      />
                  </Grid>

            <FormField
              label="Description"
              value={education.description}
              onChange={(value) => updateItem(index, { description: value })}
              isTextarea
              placeholder="Describe your education experience..."
            />
          </VStack>
        </Card>
      ))}
    </VStack>
  );
};

// Experience Form Component
const ExperienceForm = ({ data, addItem, removeItem, updateItem }) => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Heading size="md" color="gray.700">Work Experience</Heading>
        <Button size="sm" leftIcon={<Icon as={FiPlus} />} onClick={addItem}>
                  Add Experience
                </Button>
      </HStack>

      {data.map((experience, index) => (
        <Card key={index} variant="outline" p={4}>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Experience #{index + 1}</Text>
                    <IconButton
                size="sm"
                icon={<Icon as={FiTrash2} />}
                onClick={() => removeItem(index)}
                      colorScheme="red"
                      variant="ghost"
              />
            </HStack>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Company"
                value={experience.company}
                onChange={(value) => updateItem(index, { company: value })}
              />
              <FormField
                label="Position"
                value={experience.position}
                onChange={(value) => updateItem(index, { position: value })}
              />
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Start Date"
                value={experience.startDate}
                onChange={(value) => updateItem(index, { startDate: value })}
                        type="month"
              />
              <FormField
                label="End Date"
                value={experience.endDate}
                onChange={(value) => updateItem(index, { endDate: value })}
                        type="month"
                      />
                  </Grid>

            <FormField
              label="Description"
              value={experience.description}
              onChange={(value) => updateItem(index, { description: value })}
              isTextarea
              placeholder="Describe your role and responsibilities..."
            />
          </VStack>
        </Card>
      ))}
    </VStack>
  );
};

// Skills Form Component
const SkillsForm = ({ data, addItem, removeItem, updateItem }) => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Heading size="md" color="gray.700">Skills</Heading>
        <Button size="sm" leftIcon={<Icon as={FiPlus} />} onClick={addItem}>
          Add Skill Category
                </Button>
      </HStack>

      {data.map((skill, index) => (
        <Card key={index} variant="outline" p={4}>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Skill Category #{index + 1}</Text>
                      <IconButton
                size="sm"
                icon={<Icon as={FiTrash2} />}
                onClick={() => removeItem(index)}
                        colorScheme="red"
                        variant="ghost"
              />
            </HStack>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Category"
                value={skill.category}
                onChange={(value) => updateItem(index, { category: value })}
                placeholder="e.g., Programming Languages, Tools, etc."
              />
              <FormField
                label="Skills"
                value={skill.skills}
                onChange={(value) => updateItem(index, { skills: value })}
                placeholder="e.g., JavaScript, React, Node.js"
              />
              </Grid>
          </VStack>
        </Card>
      ))}
    </VStack>
  );
};

// Projects Form Component
const ProjectsForm = ({ data, addItem, removeItem, updateItem }) => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Heading size="md" color="gray.700">Projects</Heading>
        <Button size="sm" leftIcon={<Icon as={FiPlus} />} onClick={addItem}>
          Add Project
        </Button>
      </HStack>

      {data.map((project, index) => (
        <Card key={index} variant="outline" p={4}>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Project #{index + 1}</Text>
              <IconButton
                size="sm"
                icon={<Icon as={FiTrash2} />}
                onClick={() => removeItem(index)}
                colorScheme="red"
                variant="ghost"
              />
            </HStack>

            <FormField
              label="Project Name"
              value={project.name}
              onChange={(value) => updateItem(index, { name: value })}
            />

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
              <FormField
                label="Start Date"
                value={project.startDate}
                onChange={(value) => updateItem(index, { startDate: value })}
                type="month"
              />
              <FormField
                label="End Date"
                value={project.endDate}
                onChange={(value) => updateItem(index, { endDate: value })}
                type="month"
              />
      </Grid>

            <FormField
              label="Technologies"
              value={project.technologies}
              onChange={(value) => updateItem(index, { technologies: value })}
              placeholder="e.g., React, Node.js, MongoDB"
            />

            <FormField
              label="Project Link"
              value={project.link}
              onChange={(value) => updateItem(index, { link: value })}
              type="url"
              placeholder="https://github.com/username/project"
            />

            <FormField
              label="Description"
              value={project.description}
              onChange={(value) => updateItem(index, { description: value })}
              isTextarea
              placeholder="Describe your project..."
            />
          </VStack>
        </Card>
      ))}
    </VStack>
  );
};

// Reusable Form Field Component
const FormField = ({ 
  label, 
  value, 
  onChange, 
  icon: IconComponent, 
  type = "text", 
  isTextarea = false,
  placeholder = "" 
}) => {
  const { Input, Textarea } = require('@chakra-ui/react');
  
  return (
    <Box>
      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
        {label}
      </Text>
      <HStack>
        {IconComponent && <Icon as={IconComponent} color="gray.400" />}
        {isTextarea ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            size="sm"
            resize="vertical"
            minH="100px"
          />
        ) : (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            size="sm"
          />
        )}
      </HStack>
    </Box>
  );
};

// Resume Preview Component
const ResumePreview = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <Box fontFamily="serif" fontSize="12px" lineHeight="1.4">
              {/* Header */}
      <Box textAlign="center" mb={6}>
        <Text fontSize="24px" fontWeight="bold" color="#2D3748">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </Text>
        <Text fontSize="14px" color="#4A5568" mt={1}>
          {data.personalInfo.email} • {data.personalInfo.phone}
        </Text>
        <Text fontSize="12px" color="#718096" mt={1}>
          {data.personalInfo.address}, {data.personalInfo.city}, {data.personalInfo.state} {data.personalInfo.zipCode}
        </Text>
        {(data.personalInfo.website || data.personalInfo.linkedin || data.personalInfo.github) && (
          <Text fontSize="12px" color="#718096" mt={1}>
            {data.personalInfo.website && `${data.personalInfo.website} • `}
            {data.personalInfo.linkedin && `${data.personalInfo.linkedin} • `}
            {data.personalInfo.github}
                </Text>
                )}
              </Box>

              {/* Summary */}
      {data.personalInfo.summary && (
        <Box mb={4}>
          <Text fontSize="14px" fontWeight="bold" color="#2D3748" mb={2}>
            PROFESSIONAL SUMMARY
          </Text>
          <Text fontSize="12px" color="#4A5568">
            {data.personalInfo.summary}
                  </Text>
                </Box>
              )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <Box mb={4}>
          <Text fontSize="14px" fontWeight="bold" color="#2D3748" mb={2}>
            PROFESSIONAL EXPERIENCE
          </Text>
          {data.experience.map((exp, index) => (
            <Box key={index} mb={3}>
              <HStack justify="space-between" mb={1}>
                <Text fontSize="12px" fontWeight="bold" color="#2D3748">
                  {exp.position}
                </Text>
                <Text fontSize="11px" color="#718096">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
              </HStack>
              <Text fontSize="11px" color="#4A5568" mb={1}>
                {exp.company}
                    </Text>
              <Text fontSize="11px" color="#4A5568">
                {exp.description}
                    </Text>
                  </Box>
                ))}
              </Box>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <Box mb={4}>
          <Text fontSize="14px" fontWeight="bold" color="#2D3748" mb={2}>
            EDUCATION
          </Text>
          {data.education.map((edu, index) => (
            <Box key={index} mb={3}>
              <HStack justify="space-between" mb={1}>
                <Text fontSize="12px" fontWeight="bold" color="#2D3748">
                  {edu.degree} in {edu.field}
                </Text>
                <Text fontSize="11px" color="#718096">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </HStack>
              <Text fontSize="11px" color="#4A5568">
                {edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}
              </Text>
              {edu.description && (
                <Text fontSize="11px" color="#4A5568" mt={1}>
                  {edu.description}
                </Text>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <Box mb={4}>
          <Text fontSize="14px" fontWeight="bold" color="#2D3748" mb={2}>
            SKILLS
                    </Text>
          {data.skills.map((skill, index) => (
            <Box key={index} mb={2}>
              <Text fontSize="11px" fontWeight="bold" color="#4A5568" mb={1}>
                {skill.category}:
                    </Text>
              <Text fontSize="11px" color="#4A5568">
                {skill.skills}
                    </Text>
                  </Box>
                ))}
              </Box>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <Box mb={4}>
          <Text fontSize="14px" fontWeight="bold" color="#2D3748" mb={2}>
            PROJECTS
          </Text>
          {data.projects.map((project, index) => (
            <Box key={index} mb={3}>
              <HStack justify="space-between" mb={1}>
                <Text fontSize="12px" fontWeight="bold" color="#2D3748">
                  {project.name}
                </Text>
                <Text fontSize="11px" color="#718096">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </Text>
              </HStack>
              <Text fontSize="11px" color="#4A5568" mb={1}>
                Technologies: {project.technologies}
              </Text>
              <Text fontSize="11px" color="#4A5568">
                {project.description}
              </Text>
              {project.link && (
                <Text fontSize="11px" color="#3182CE" mt={1}>
                  {project.link}
                </Text>
              )}
                    </Box>
                  ))}
              </Box>
      )}
    </Box>
  );
};

export default ResumeGenerator;
