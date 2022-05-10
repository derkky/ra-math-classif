import { Typography, Box, Card, CardHeader, CardContent } from "@mui/material"
import Image from "mui-image"

const About = () => {
    return (
        <>

            <Image
                src="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/What-is-Educational-Technology_-Definition-Examples-Etc..jpg"
                wrapperStyle={{ marginTop: 0 }}
                sx={{ maxHeight: 400 }}
            />
            <Box
                sx={{ display: "flex", padding: { sm: 1, md: 5 } }}
            >
                <Card
                    sx={{ flex: 1, minWidth: 320, position: "relative", bottom: 100 }}
                >
                    <CardHeader title="About" />
                    <CardContent>
                        <Typography>
                            Acknowledging the difficulties in scaling personalised teaching environments within the S$84.5b educational market, Keptan aims to provide an easy-to-use and topic agnostic AI-powered platform to enable educational and training institutions of all sizes and industries.
                        </Typography>
                        <br />
                        <Typography>
                            The founders comprises of Professor Jussi Keppo and Dr Tan Hong Ming, both from the Department of Analytics and Operations at NUS Business School. Jussi Keppo is the Co-Founder of X0PA AI (Series A USD$4.2M) and is also a professor at NUS Business School and the Research Director of the Institute of Operations Research and Analytics at NUS. Tan Hong Ming is a lecturer at the NUS Business School and is also a research fellow at the SIA-NUS Corp Lab working on Transforming Competency and Skill Development. The team's depth of knowledge in AI methodologies alongside a strong wealth of experience in creating commercially desirable algorithms allows for both speed and accuracy in product iterations for commercial success.
                        </Typography>
                        <br />
                        <Typography>
                            Keptan's patent-pending AI continuously and automatically tailors instruction to the individual, allowing each person to learn important material in less time than current teaching techniques and making it a critical tool for tuition classes, schools and a range of other teaching environments that struggle to teach large and diverse groups of students. Topic agnostic capabilities gives Keptan an advantage over other edutech companies that are subject specific (e.g., Math questions only).
                        </Typography>
                        <br />
                        <Typography>
                            The company is currently discussing a pilot with Science Ventures Learning Hub, and has an LOI from MediVR. Keptan seeking a S$100,000 funding to scale its engineering team to further accelerate its tech capabilities and sales teams to begin generating revenue, and shift into AR/VR capabilities in the metaverse.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>

    )
}

export default About