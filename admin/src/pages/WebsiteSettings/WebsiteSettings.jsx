import { useEffect, useState } from "react";
import {
    Card,
    Container,
    Row,
    Col,
    Spinner,
    Alert
} from "react-bootstrap";

import WebsiteSettingsForm from "../../components/forms/WebsiteSettingsForm";

import {
    getWebsiteSettings,
    updateWebsiteSettings
} from "../../api/settingsApi";

const WebsiteSettings = () => {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [variant, setVariant] = useState("");

    const [settings, setSettings] = useState({

        company_name: "",

        website_title: "",

        tagline: "",

        email: "",

        phone: "",

        alternate_phone: "",

        whatsapp: "",

        address: "",

        city: "",

        state: "",

        country: "",

        postal_code: "",

        google_map_iframe: "",

        business_hours: "",

        copyright: "",

        footer_description: ""

    });

    /*
    |--------------------------------------------------------------------------
    | Load Website Settings
    |--------------------------------------------------------------------------
    */

    const fetchSettings = async () => {

        try {

            const response = await getWebsiteSettings();

            setSettings(response.data);

        }

        catch (error) {

            setVariant("danger");

            setMessage(
                error?.response?.data?.message ||
                "Unable to load website settings."
            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSettings();

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        try {

            setSaving(true);

            const response = await updateWebsiteSettings(settings);

            setVariant("success");

            setMessage(response.message);

        }

        catch (error) {

            setVariant("danger");

            setMessage(
                error?.response?.data?.message ||
                "Something went wrong."
            );

        }

        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <Container className="py-5 text-center">

                <Spinner animation="border" />

            </Container>

        );

    }

    return (

        <Container fluid>

            <Row>

                <Col lg={12}>

                    <Card className="shadow-sm">

                        <Card.Header>

                            <h4 className="mb-0">

                                Website Settings

                            </h4>

                        </Card.Header>

                        <Card.Body>

                            {

                                message &&

                                <Alert variant={variant}>

                                    {message}

                                </Alert>

                            }

                            <WebsiteSettingsForm

                                settings={settings}

                                setSettings={setSettings}

                                handleSubmit={handleSubmit}

                                saving={saving}

                            />

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

};

export default WebsiteSettings;