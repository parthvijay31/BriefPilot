import "./App.css";
import { useState } from "react";
import API from "./services/api";

function App() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyzeEmail = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);

      const response = await API.post("/analyze-email", {
        email: email,
      });

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(result.follow_up_email);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setResult(null);
    setEmail("");
    setCopied(false);
  };

  return (
    <div className="container">
      <h1> BriefPilot</h1>

      <p className="subtitle">
        Replace the middleman. Automate creative request intake with AI.
      </p>

      <textarea
        placeholder="Paste client email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {!result ? (
        <button onClick={analyzeEmail} disabled={loading}>
          {loading ? " Analyzing..." : " Analyze Request"}
        </button>
      ) : (
        <>
          <div className="card status">
            <h2> AI Analysis Complete</h2>

            <p>
              Request analyzed successfully and routed automatically.
            </p>
          </div>

          <button onClick={resetAnalysis}>
             Analyze Another Request
          </button>
        </>
      )}

      {result && (
        <div className="results">
          <div className="card">
            <h2> Client Brief</h2>

            <p>
              <strong>Design Request:</strong>
              {result.required_fields.design_request}
            </p>

            <p>
              <strong>Purpose:</strong>
              {result.required_fields.purpose}
            </p>

            <p>
              <strong>Brand Guidelines:</strong>
              {result.required_fields.brand_guidelines}
            </p>
          </div>

          <div className="card">
            <h2> Missing Information</h2>

            <ul>
              {result.missing_fields.map((item) => (
                <li key={item}>
                  • {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2> Assigned Designer</h2>

            <p>
              <strong>Name:</strong>
              {result.assigned_to.name}
            </p>

            <p>
              <strong>Team:</strong>
              {result.assigned_to.team}
            </p>
          </div>

          <div className="card">
            <h2> Follow-up Email</h2>

            <pre>{result.follow_up_email}</pre>

            <button onClick={copyEmail}>
              {copied ? " Copied!" : " Copy Email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;