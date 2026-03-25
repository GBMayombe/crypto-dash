import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    })
    .slice()
    .sort((coin1, coin2) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return coin2.market_cap - coin1.market_cap;
        case 'market_cap_asc':
          return coin1.market_cap - coin2.market_cap;

        case 'price_desc':
          return coin2.current_price - coin1.current_price;
        case 'price_asc':
          return coin1.market_cap - coin2.market_cap;

        case 'change_desc':
          return (
            coin2.price_change_percentage_24h -
            coin1.price_change_percentage_24h
          );
        case 'change_asc':
          return (
            coin1.price_change_percentage_24h -
            coin2.price_change_percentage_24h
          );
      }
    });
  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading ...</p>}
      {error && <div className="error">{error}</div>}

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
