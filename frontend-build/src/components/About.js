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
                sx={{ display: "flex", padding: 5 }}
            >
                <Card
                    sx={{ flex: 1, minWidth: 320, position: "relative", bottom: 100 }}
                >
                    <CardHeader title="About" />
                    <CardContent>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tortor sapien. Nulla a porta erat. Fusce tempor et orci sed sagittis. Donec blandit urna dapibus, varius tortor vitae, scelerisque sem. Fusce commodo euismod metus et consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum elementum consequat lacus, sed faucibus arcu iaculis et. In sem leo, bibendum sit amet congue at, malesuada ac nunc.
                        </Typography>
                        <br/>
                        <Typography>
                            Sed dapibus urna laoreet sem pharetra, iaculis sodales lacus fermentum. Vivamus lacinia ante vitae consequat vestibulum. Etiam fermentum, lorem non porttitor iaculis, nibh mauris tempor erat, malesuada ornare ligula risus ac felis. Ut mollis elit sed massa maximus pharetra sed at nisl. Mauris tempor varius dolor. Quisque sit amet vestibulum turpis. Fusce fringilla placerat arcu, nec rutrum arcu posuere at. Phasellus egestas laoreet arcu a pellentesque. Maecenas egestas volutpat ex, nec finibus justo placerat at. Aenean consequat laoreet elit, ut finibus risus gravida in. Quisque dui ex, malesuada non dui pulvinar, mollis eleifend felis. Fusce vitae libero leo. Morbi eget leo sit amet nisi venenatis laoreet a et enim. Morbi ac eleifend libero, et finibus nunc.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>

    )
}

export default About