import {
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";

const WebsiteSettingsForm = ({
    settings,
    setSettings,
    handleSubmit,
    saving
}) => {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    return (

        <Form>

            {/* =======================================================
                Company Information
            ======================================================= */}

            <h5 className="mb-3">
                Company Information
            </h5>

            <Row>

                <Col md={6} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            Company Name
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="company_name"
                            value={settings.company_name || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

                <Col md={6} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            Website Title
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="website_title"
                            value={settings.website_title || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

            </Row>

            <Row>

                <Col md={12} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            Tagline
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="tagline"
                            value={settings.tagline || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

            </Row>

            <hr />

            {/* =======================================================
                Contact Information
            ======================================================= */}

            <h5 className="mb-3">
                Contact Information
            </h5>

            <Row>

                <Col md={6} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            Email Address
                        </Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            value={settings.email || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

                <Col md={6} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            Phone Number
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="phone"
                            value={settings.phone || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

            </Row>

            <Row>

                <Col md={6} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            Alternate Phone
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="alternate_phone"
                            value={settings.alternate_phone || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

                <Col md={6} className="mb-3">

                    <Form.Group>

                        <Form.Label>
                            WhatsApp Number
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="whatsapp"
                            value={settings.whatsapp || ""}
                            onChange={handleChange}
                        />

                    </Form.Group>

                </Col>

            </Row>

            <hr />
            <Button
                type="submit"
                variant="primary"
                disabled={saving}
            >
                {saving ? 'Saving...' : 'Save Settings'}
            </Button>
        </Form>
    );
};

export default WebsiteSettingsForm;