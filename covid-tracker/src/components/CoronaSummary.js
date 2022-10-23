import styles from "./coronaSummary.module.css";

const CoronaSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Covid-19</h2>
      <p>
        COVID-19 affects different people in different ways. Most infected
        people will develop mild to moderate illness and recover without
        hospitalization.
      </p>
      <h1>Most common symptoms</h1>
      <ul>
        <li>cough</li>
        <li>fever</li>
        <li>tiredness</li>
        <li>loss of taste or smell</li>
      </ul>
      <h1>Less common symptoms</h1>
      <ul>
        <li>sore throat</li>
        <li>headache</li>
        <li>aches and pains</li>
        <li>diarrhoea</li>
        <li>headache</li>
        <li>a rash on skin, or discolouration of fingers or toes</li>
        <li>red or irritated eyes</li>
      </ul>
      <h1>Serious symptoms</h1>
      <ul>
        <li>cough</li>
        <li>fever</li>
        <li>tiredness</li>
        <li>loss of taste or smell</li>
      </ul>
      <p className={styles.bolderText}>
        Seek immediate medical attention if you have serious symptoms.
      </p>
      <p>
        People with mildymptoms who are otherwise healthy should manage their
        symptoms at home. On average it takes 5–6 days from when someone is
        infected with the virus for symptoms to show, however it can take up to
        14 days.
      </p>
    </section>
  );
};
export default CoronaSummary;
