#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/transaction.hpp>
#include <eosiolib/crypto.h>


using namespace std;
using namespace eosio;

class [[eosio::contract]] foodscm : public eosio::contract {
  private:

    struct [[eosio::table]] cropdetails {
        uint64_t productId;
        name producer;
        name buyer;
        string imageHash;
        string cropName;
        uint64_t cropAmount;
        uint64_t price;
        bool sold;
        
        auto primary_key()const { return productId;}
    };
    
    struct [[eosio::table]] transdetail {
      uint64_t productId;
      capi_checksum256 transactionID;

      auto primary_key()const { return productId;}
    };

    struct [[eosio::table]] userdata {
      name customer;
      string accType;
      uint64_t tokenBalance;

      auto primary_key()const { return customer.value;}
    };
    
    typedef eosio::multi_index<name("cdetail"), cropdetails> crop_data;
    typedef eosio::multi_index<name("udata"), userdata> user_data;  
    typedef eosio::multi_index<name("transdetail"), transdetail> trans_detail;  

    crop_data _cropdata;
    user_data _userdata;
    trans_detail _transdetail;

  public:
    using contract::contract;

    foodscm( name receiver, name code, datastream<const char*> ds ): contract(receiver, code, ds),
                       _cropdata(receiver, receiver.value),
                       _userdata(receiver, receiver.value),
                       _transdetail(receiver, receiver.value){}
    
    capi_checksum256 get_trx_id() {
        size_t size = transaction_size();
        char buf[size];
        capi_checksum256 h;
        size_t read = read_transaction( buf, size );
        check( size == read, "read_transaction failed");
        sha256(buf, read, &h);
        return h;
    }

    [[eosio::action]]
    void userdata(name customer, string accType, uint64_t tokenBalance) {
      
      _userdata.emplace(_self, [&](auto& row){
        row.customer = customer;
        row.accType = accType;
        row.tokenBalance = tokenBalance;
      });
    }
                       
    [[eosio::action]]
    void uploadcrop(name producer, string cropName, uint64_t cropAmount, string imageHash, uint64_t price) {

      _cropdata.emplace(_self, [&](auto& row) {
          row.productId = _cropdata.available_primary_key();
          row.producer = producer;
          row.cropName = cropName;
          row.cropAmount = cropAmount;
          row.imageHash = imageHash;
          row.price = price;
          row.sold = false;
          row.buyer = producer;
      }); 
    }
    
    
  [[eosio::action]]
    void buycrop(name buyer, uint64_t cropPid, asset price, string memo) 
    {
        auto itr = _cropdata.find(cropPid);
        name seller = itr->producer;

        struct transfer
        { 
            name buyer;
            name seller;
            asset price;
            string memo;
        };

        eosio::action transfer_action = eosio::action(
            permission_level(buyer, name("active")),
            name("eosio.token"), 
            name("transfer"),
            transfer{buyer, seller, price, memo});
            transfer_action.send();
        
        auto payer = has_auth( seller ) ? seller : buyer;
        _cropdata.modify(itr, payer, [&](auto& row){
          row.sold = true;
          row.buyer = buyer;
        });
        
        _transdetail.emplace(payer, [&](auto& row){
          row.productId = cropPid;
          row.transactionID = get_trx_id();
        });
    }
};
