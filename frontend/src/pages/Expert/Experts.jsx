import { useState, useEffect } from "react";
import ExpertCard from "../../components/Experts/ExpertCard";
import { experts } from "../../assets/data/experts";
import Testimonial from '../../components/Testimonial/Testimonial';

const Experts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredExperts, setFilteredExperts] = useState(experts);

  useEffect(() => {
    // Simuler le chargement et la gestion des erreurs
    const fetchExperts = async () => {
      try {
        // Ici, vous pouvez ajouter la logique pour récupérer les experts depuis une API si nécessaire
        // Exemple : const response = await fetch('/api/experts');
        // const data = await response.json();
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchExperts();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = experts.filter(expert =>
      expert.name.toLowerCase().includes(query)
    );
    setFilteredExperts(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading experts: {error.message}</p>;

  return (
    <>
      <section className="bg-[#f9f9f9]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor"
              placeholder="Search Experts"
              onChange={handleSearch}
            />
            <button 
              className="btn mt-0 rounded-r-md"
              onClick={() => handleSearch({ target: { value: document.querySelector('input[type="search"]').value } })}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center text-3xl font-semibold mb-4">CLIENTS REVIEWS</h2>
            <p className="text_para text-center text-lg">
              Les domaines d’intervention de nos experts
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
    </>
  );
};

export default Experts;
